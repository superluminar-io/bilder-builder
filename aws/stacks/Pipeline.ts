import * as Codepipeline from '@aws-cdk/aws-codepipeline'
import * as CodepipelineActions from '@aws-cdk/aws-codepipeline-actions'
import * as CodeBuild from '@aws-cdk/aws-codebuild'
import * as S3 from '@aws-cdk/aws-s3'
import { CfnOutput, Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core'
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines'

/**
 * The stack that defines the application pipeline
 */
export class BilderBuilderPipelineStack extends Stack {
  public readonly bucketDomain: CfnOutput

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const websiteBucket = new S3.Bucket(this, 'Files', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true
    })

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

    const buildStage = pipeline.addStage('BuildBilderBuilderStage')

    buildStage.addActions(
      new CodepipelineActions.CodeBuildAction({
        input: sourceArtifact,
        outputs: [buildArtifact],
        actionName: 'Build',
        project: new CodeBuild.PipelineProject(this, 'BuildBilderBuilderProject', {
          projectName: 'BuildBilderBuilderProject'
        })
      })
    )

    const deployStage = pipeline.addStage('DeployBilderBuilderStage')

    deployStage.addActions(
      new CodepipelineActions.S3DeployAction({
        actionName: 'Deploy',
        input: buildArtifact,
        bucket: websiteBucket
      })
    )

    this.bucketDomain = new CfnOutput(this, 'BucketDomain', {
      value: websiteBucket.bucketWebsiteDomainName
    })
  }
}
