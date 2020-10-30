import { Stack, CfnOutput, Construct, StackProps } from '@aws-cdk/core'
import * as S3 from '@aws-cdk/aws-s3'
import { Distribution } from '@aws-cdk/aws-cloudfront'
import { S3Origin } from '@aws-cdk/aws-cloudfront-origins'
import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager'
import { HostedZone, ARecord, RecordTarget } from '@aws-cdk/aws-route53'
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets'

export interface WebsiteStackProps extends StackProps {
  domainName: string
}

export class WebsiteStack extends Stack {
  readonly hostedZoneId = 'Z05359862DR2XCO36U853'

  constructor(scope: Construct, id: string, props: WebsiteStackProps) {
    super(scope, id, props)

    const zone = HostedZone.fromHostedZoneAttributes(this, 'BilderBuilderZone', {
      zoneName: props.domainName,
      hostedZoneId: this.hostedZoneId
    })

    const bucket = new S3.Bucket(this, 'WebsiteBucket', {
      bucketName: props.domainName
    })

    const certificate = new DnsValidatedCertificate(this, 'WebsiteCert', {
      domainName: props.domainName,
      region: 'us-east-1',
      hostedZone: zone
    })

    const distribution = new Distribution(this, 'WebsiteDistribution', {
      defaultBehavior: { origin: new S3Origin(bucket) },
      domainNames: [props.domainName],
      certificate: certificate
    })

    new ARecord(this, 'AliasRecord', {
      zone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    })

    new CfnOutput(this, 'BucketDomain', {
      value: bucket.bucketWebsiteDomainName
    })
  }
}
