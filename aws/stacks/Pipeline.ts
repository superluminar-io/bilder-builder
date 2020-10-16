import * as Codepipeline from '@aws-cdk/aws-codepipeline'
import * as CodepipelineActions from '@aws-cdk/aws-codepipeline-actions'
import { CfnOutput, Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core'
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines'
import * as CodeBuild from '@aws-cdk/aws-codebuild'
import { Bucket } from '@aws-cdk/aws-s3'

import { BilderBuilderStage } from '../stages/BilderBuilder'

/**
 * The stack that defines the application pipeline
 */
export class BilderBuilderPipelineStack extends Stack {
  readonly targetDomain = 'bilderbuilder.superluminar.io'

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
    const bilderBuilderStage = new BilderBuilderStage(this, 'BilderBuilderInfraStage', { bucketName: this.targetDomain, ...props })

    pipeline.addApplicationStage(bilderBuilderStage)

    const buildAndDeployStage = pipeline.addStage('BuildAndDeploy')

    buildAndDeployStage.addActions(
      this.buildAction(sourceArtifact, buildArtifact, buildAndDeployStage.nextSequentialRunOrder()),
      this.deployAction(buildArtifact, this.targetDomain, buildAndDeployStage.nextSequentialRunOrder())
    )

    new CfnOutput(this, 'BucketDomain', {
      value: this.targetDomain
    })
  }

  private buildAction(
    sourceArtifact: Codepipeline.Artifact,
    buildArtifact: Codepipeline.Artifact,
    runOrder: number
  ): CodepipelineActions.CodeBuildAction {
    return new CodepipelineActions.CodeBuildAction({
      input: sourceArtifact,
      outputs: [buildArtifact],
      runOrder: runOrder,
      actionName: 'Build',
      project: new CodeBuild.PipelineProject(this, 'BuildBilderBuilderProject', {
        projectName: 'BuildBilderBuilderProject'
      })
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
