import { Construct, Stage, StageProps } from '@aws-cdk/core'
import { WebsiteStack } from '../stacks/Website'
import { Bucket } from '@aws-cdk/aws-s3'

export interface BilderBuilderDeploymentStageProps extends StageProps {
  bucketName: string
}

export class BilderBuilderStage extends Stage {
  public readonly bucket: Bucket

  constructor(scope: Construct, id: string, props: BilderBuilderDeploymentStageProps) {
    super(scope, id, props)

    const website = new WebsiteStack(this, 'BilderBuilderStack', props)

    this.bucket = website.bucket

  }
}
