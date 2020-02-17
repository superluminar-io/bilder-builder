import * as CDK from '@aws-cdk/core'
import * as S3 from '@aws-cdk/aws-s3'
import * as S3Deployment from '@aws-cdk/aws-s3-deployment'

const path = './build'

export class StorageStack extends CDK.Stack {
  constructor(app: CDK.App, id: string, props?: CDK.StackProps) {
    super(app, id, props)

    const bucket = new S3.Bucket(this, 'Files', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true
    })

    new S3Deployment.BucketDeployment(this, 'Deployment', {
      sources: [S3Deployment.Source.asset(path)],
      destinationBucket: bucket
    })

    new CDK.CfnOutput(this, 'BucketDomain', {
      value: bucket.bucketWebsiteDomainName
    })
  }
}
