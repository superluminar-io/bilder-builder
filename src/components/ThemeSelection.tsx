import React from 'react'
import styled from 'styled-components'

import { ThemeList } from '../themes'
import { FormElement } from './FormElement'

const Wrapper = styled.div`
  border-top: 5px solid #ddd;
`

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  font-size: 1.5rem;
  line-height: 2.5rem;
  padding: 0.5rem 0.5rem;
  margin: 0.5rem 0;

  &:focus {
    outline: none;
  }
`

export interface ThemeSelectionProps {
  theme?: string
  onChange: (theme: string) => void
}

export const ThemeSelection: React.FC<ThemeSelectionProps> = ({ theme, onChange }) => {
  return (
    <Wrapper>
      <FormElement name="Theme">
        <Select value={theme} onChange={e => onChange(e.target.value)}>
          <option disabled={!!theme}>Please Select</option>

          {Object.keys(ThemeList).map((item, index) => (
            <option value={item} key={index}>
              {ThemeList[item].Config.name}
            </option>
          ))}
        </Select>
      </FormElement>
    </Wrapper>
  )
}
