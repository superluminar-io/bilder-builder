import React from 'react'

import { Author, AuthorProps } from './components/Author'
import { Background } from './components/Background'
import { Headline } from './components/Headline'

import { ThemeFieldType, ThemeConfig } from '../../config'

interface ThemeProps {
  title: string
  author: AuthorProps
}

const Theme: React.FC<ThemeProps> = ({ title, author }) => (
  <>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i&display=swap" rel="stylesheet" />

    <Background>
      <Headline>{title}</Headline>
      <Author {...author} />
    </Background>
  </>
)

export const Config: ThemeConfig = {
  name: 'superluminar (default, author)',
  default: {
    title: 'Build a continuous snack delivery pipeline with AWS DeepSnack 🚀',
    author: {
      name: 'Anthony R. Curtis',
      description: 'AWS DeepDog Expert, former snack collector, and Chief Snack Officer',
      image: 'https://superluminar.io/images/team/example.jpg'
    }
  },
  fields: [
    {
      key: 'title',
      label: 'Title',
      type: ThemeFieldType.TEXT
    },
    {
      key: 'author',
      label: 'Author',
      type: ThemeFieldType.SELECT,
      values: [
        {
          name: 'Boris Erdmann',
          image: 'https://superluminar.io/images/team/boris-erdmann.jpg',
          description: 'Agile Coach, former CTO & VP Engineering, AWS Certified Developer, and Co-Founder'
        },
        {
          name: 'Hendric Rüsch',
          image: 'https://superluminar.io/images/team/hendric-ruesch.jpg',
          description: 'Expert for Business Strategies, former Business Development Manager, and Co-Founder'
        },
        {
          name: 'Jan Brauer',
          image: 'https://superluminar.io/images/team/jan-brauer.jpg',
          description: 'AWS Certified Solutions Architect, former Engineering Manager, and Co-Founder'
        },
        {
          name: 'Sebastian Müller',
          image: 'https://superluminar.io/images/team/sebastian-mueller.jpg',
          description: 'AWS Serverless Hero, AWS Certified Solutions Architect, and Senior Cloud Consultant'
        },
        {
          name: 'Soenke Ruempler',
          image: 'https://superluminar.io/images/team/soenke-ruempler.jpg',
          description: 'AWS APN Ambassador, AWS Certified Solutions Architect - Professional, and Co-Founder'
        },
        {
          name: 'Till Kahlbrock',
          image: 'https://superluminar.io/images/team/till-kahlbrock.jpg',
          description: 'AWS Certified DevOps Engineer - Professional and Senior Cloud Consultant'
        },
        {
          name: 'Alexander Steppke',
          image: 'https://superluminar.io/images/team/alexander-steppke.jpg',
          description: 'GCP Certified Professional Cloud Architect, AWS Certified Solutions Architect, Developer Associate and SysOps Administrator, and Cloud Consultant'
        },
        {
          name: 'Henrik Fricke',
          image: 'https://superluminar.io/images/team/henrik-fricke.jpg',
          description: 'Cloud Consultant'
        },
      ]
    }
  ]
}

export default Theme
