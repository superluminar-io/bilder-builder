import React from 'react'
import styled from 'styled-components'

import { ThemeSelection } from './ThemeSelection'
import { ThemeFields } from './ThemeFields'
import { ThemeField } from '../config'
import { ThemeList } from '../themes'

const Wrapper = styled.div`
  display: block;
  width: 600px;
  margin-bottom: 1rem;
`

export interface FormProps {
  theme?: string
  onChangeTheme: (theme: string) => void
  onChangeField: (data: {}) => void
}

export const Form: React.FC<FormProps> = ({ theme, onChangeTheme, onChangeField }) => {
  let fields: Array<ThemeField> = []

  if (theme) {
    fields = ThemeList[theme].Config.fields
  }

  return (
    <Wrapper>
      <ThemeSelection theme={theme} onChange={onChangeTheme} />
      {theme && fields && <ThemeFields onChange={onChangeField} fields={fields} />}
    </Wrapper>
  )
}
