import { Stack, CfnOutput, Construct, StackProps } from '@aws-cdk/core'
import * as S3 from '@aws-cdk/aws-s3'

export interface WebsiteStackProps extends StackProps {
  bucketName: string
}

export class WebsiteStack extends Stack {
  public readonly bucket: S3.Bucket
  public readonly bucketDomain: CfnOutput

  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props)

    this.bucket = new S3.Bucket(this, 'WebsiteBucket', {
      bucketName: props.bucketName,
      websiteIndexDocument: 'index.html',
      publicReadAccess: true
    })

    this.bucketDomain = new CfnOutput(this, 'BucketDomain', {
      value: this.bucket.bucketWebsiteDomainName
    })
  }
}
