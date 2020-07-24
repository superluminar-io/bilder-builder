import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core'
import { StorageStack } from '../stacks/Storage'

export class BilderBuilderDeploymentStage extends Stage {
  public readonly bucketDomain: CfnOutput

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props)

    const service = new StorageStack(this, 'BilderBuilder')

    this.bucketDomain = service.bucketDomain
  }
}
