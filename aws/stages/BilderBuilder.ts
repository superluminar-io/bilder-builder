import { Construct, Stage, StageProps } from '@aws-cdk/core'
import { WebsiteStack } from '../stacks/Website'

export interface BilderBuilderDeploymentStageProps extends StageProps {
  domainName: string
}

export class BilderBuilderStage extends Stage {
  constructor(scope: Construct, id: string, props: BilderBuilderDeploymentStageProps) {
    super(scope, id, props)

    new WebsiteStack(this, 'BilderBuilderStack', props)
  }
}
