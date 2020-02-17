import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { FormElement } from './FormElement'
import { ThemeField, ThemeFieldType } from '../config'

export interface ThemeFields {
  fields: Array<ThemeField>
  onChange: (data: {}) => void
}

const Wrapper = styled.ul`
  list-style-type: none;
  padding: 0;

  display: block;
  width: 600px;
  margin-bottom: 0 0 1rem 0;
  border-top: 5px solid #ddd;
`

const FieldItem = styled.li`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 1.8rem;
  line-height: 3rem;
  padding: 0.3rem 0.1rem;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  border: 0;

  &:focus {
    outline: none;
  }
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

const Field = (field: ThemeField, data: any, onChange: (key: string, value: string) => void) => {
  switch (field.type) {
    case ThemeFieldType.TEXT:
      return <Input onChange={e => onChange(field.key, e.target.value)} placeholder="Your title goes here …" />
    case ThemeFieldType.SELECT:
      return (
        <Select onChange={e => onChange(field.key, field.values![Number(e.target.value)])}>
          <option disabled={!!data[field.key]}>Please Select</option>

          {field.values!.map((key, index) => (
            <option value={index.toString()} key={index}>
              {key.name}
            </option>
          ))}
        </Select>
      )
  }
}

export const ThemeFields: React.FC<ThemeFields> = ({ fields, onChange }) => {
  const [data, setData] = useState({})

  const updateData = useCallback(
    (key: string, value: string) => {
      setData({ ...data, [key]: value })
    },
    [data, setData]
  )

  useEffect(() => {
    onChange(data)
  }, [data, onChange])

  return (
    <Wrapper>
      {fields.map((field, index) => (
        <FieldItem key={index}>
          <FormElement name={field.label}>{Field(field, data, updateData)}</FormElement>
        </FieldItem>
      ))}
    </Wrapper>
  )
}
