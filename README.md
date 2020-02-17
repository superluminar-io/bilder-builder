# Bilder Builder ™️

> Create images for OpenGraph meta tags.
>
> http://bilder-builder-files8e6940b8-u9jcssv71u3z.s3-website.eu-central-1.amazonaws.com/

![Bilder Builder](screenshot.png)

## Development

```bash
# Install dependencies
$ > yarn install

# Start local environment
$ > yarn start
```

## Deployment

```bash
# Bootstrap AWS account for CDK usage
$ > yarn cdk bootstrap --region eu-central-1

# Deploy CloudFormation Stack
$ > yarn cdk deploy
```
