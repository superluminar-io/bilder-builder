import React, { useCallback } from 'react'
import styled from 'styled-components'

import { Form } from './components/Form'
import { Preview } from './components/Preview'
import { useNullableState } from './helpers'

const Page = styled.div`
  width: 600px;
  margin: 10px auto 0 auto;
`

const App = () => {
  const [theme, setTheme] = useNullableState<string>()
  const [data, setData] = useNullableState<{ [key: string]: any }>()

  const onChangeField = useCallback(
    data => {
      setData(Object.keys(data).length > 0 ? data : undefined)
    },
    [setData]
  )

  return (
    <Page>
      <Form theme={theme} onChangeTheme={setTheme} onChangeField={onChangeField} />
      {theme && <Preview title="Facebook/OpenGraph" width={1200} height={630} theme={theme} data={data} />}
    </Page>
  )
}

export default App
