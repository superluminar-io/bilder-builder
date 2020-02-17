import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid #ddd;
  border-top: 0;
  box-sizing: border-box;
  padding: 0.5rem 0.8rem;
  box-sizing: border-box;
`

const Label = styled.label`
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 700;

  display: block;
  text-transform: uppercase;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #5d5b6a;
`

interface FormElement {
  name: string
}

export const FormElement: React.FC<FormElement> = ({ name, children }) => {
  return (
    <Wrapper>
      <Label>{name}</Label>
      {children}
    </Wrapper>
  )
}
