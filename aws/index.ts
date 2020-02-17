#!/usr/bin/env node
import 'source-map-support/register'

import * as CDK from '@aws-cdk/core'
import { StorageStack } from './stacks/Storage'

const app = new CDK.App()
const env = { region: 'eu-central-1' }

new StorageStack(app, 'Storage', { env, stackName: 'bilder-builder' })
