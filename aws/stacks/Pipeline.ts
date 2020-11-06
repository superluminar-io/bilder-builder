import * as Codepipeline from '@aws-cdk/aws-codepipeline'
import * as CodepipelineActions from '@aws-cdk/aws-codepipeline-actions'
import { CfnOutput, Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core'
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines'
import * as CodeBuild from '@aws-cdk/aws-codebuild'
import { Bucket } from '@aws-cdk/aws-s3'
import { SlackChannelConfiguration } from '@aws-cdk/aws-chatbot'
import { CfnNotificationRule } from '@aws-cdk/aws-codestarnotifications'

import { BilderBuilderStage } from '../stages/BilderBuilder'

/**
 * The stack that defines the application pipeline
 */
export class BilderBuilderPipelineStack extends Stack {
  readonly domainName = 'bilderbuilder.superluminar.io'

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const sourceArtifact = new Codepipeline.Artifact()
    const buildArtifact = new Codepipeline.Artifact()
    const cloudAssemblyArtifact = new Codepipeline.Artifact()

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'BilderBuilderPipeline',
      cloudAssemblyArtifact,

      // Where the source can be found
      sourceAction: new CodepipelineActions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager('github-token'),
        owner: 'superluminar-io',
        repo: 'bilder-builder'
      }),

      synthAction: SimpleSynthAction.standardYarnSynth({
        sourceArtifact,
        cloudAssemblyArtifact
      })
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const bilderBuilderStage = new BilderBuilderStage(this, 'BilderBuilderInfraStage', { domainName: this.domainName, ...props })

    pipeline.addApplicationStage(bilderBuilderStage)

    const buildAndDeployStage = pipeline.addStage('BuildAndDeploy')

    const buildProject = this.buildProject()
    const buildAction = this.buildAction(sourceArtifact, buildArtifact, buildProject, buildAndDeployStage.nextSequentialRunOrder())

    buildAndDeployStage.addActions(
      buildAction,
      this.deployAction(buildArtifact, this.domainName, buildAndDeployStage.nextSequentialRunOrder())
    )

    const slackChannel = new SlackChannelConfiguration(this, 'WebsiteSlackChannel', {
      slackChannelConfigurationName: 'website',
      slackChannelId: 'CJE6DGW4X',
      slackWorkspaceId: 'T5Y02UZDE'
    })

    new CfnNotificationRule(this, 'NotifySlack', {
      name: 'bilderbuilder-pipelinte-notifications',
      detailType: 'FULL',
      eventTypeIds: [
        'codebuild-project-build-state-succeeded',
        'codebuild-project-build-state-failed',
        'codebuild-project-build-state-in-progress',
        'codebuild-project-build-state-stopped'
      ],
      targets: [{ targetType: 'AWSChatbotSlack', targetAddress: slackChannel.slackChannelConfigurationArn }],
      resource: buildProject.projectArn
    })

    new CfnOutput(this, 'DomainName', {
      value: this.domainName
    })
  }

  private buildProject() {
    return new CodeBuild.PipelineProject(this, 'BuildBilderBuilderProject', {
      projectName: 'BuildBilderBuilderProject'
    })
  }

  private buildAction(
    sourceArtifact: Codepipeline.Artifact,
    buildArtifact: Codepipeline.Artifact,
    buildProject: CodeBuild.Project,
    runOrder: number
  ): CodepipelineActions.CodeBuildAction {
    return new CodepipelineActions.CodeBuildAction({
      input: sourceArtifact,
      outputs: [buildArtifact],
      runOrder: runOrder,
      actionName: 'Build',
      project: buildProject
    })
  }

  private deployAction(input: Codepipeline.Artifact, bucketName: string, runOrder: number): CodepipelineActions.S3DeployAction {
    const bucket = Bucket.fromBucketName(this, 'WebsiteBucket', bucketName)
    return new CodepipelineActions.S3DeployAction({
      actionName: 'Deploy',
      runOrder: runOrder,
      input: input,
      bucket: bucket
    })
  }
}
