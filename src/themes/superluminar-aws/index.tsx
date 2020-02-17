import React, { Fragment } from 'react'

import { Background } from './components/Background'
import { Headline } from './components/Headline'

import { ThemeFieldType, ThemeConfig } from '../../config'

interface ThemeProps {
  title: string
}

const Theme: React.FC<ThemeProps> = ({ title }) => (
  <Fragment>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i&display=swap" rel="stylesheet" />

    <Background>
      <Headline>{title}</Headline>
    </Background>
  </Fragment>
)

export const Config: ThemeConfig = {
  name: 'superluminar (AWS branding)',
  default: {
    title: 'News Update: APN Ambassador, AWS Serverless Hero und DevOps Professional'
  },
  fields: [
    {
      key: 'title',
      label: 'Title',
      type: ThemeFieldType.TEXT
    }
  ]
}

export default Theme
