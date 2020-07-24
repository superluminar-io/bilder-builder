#!/usr/bin/env node
import { App } from '@aws-cdk/core'
import { BilderBuilderPipelineStack } from './stacks/Pipeline'

const app = new App()

new BilderBuilderPipelineStack(app, 'BilderBuilderPipelineStack')

app.synth()
