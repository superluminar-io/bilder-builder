import React, { Fragment, useCallback, useRef } from 'react'
import { useCapture } from 'react-capture'
import styled, { css } from 'styled-components'

import { ThemeList } from '../themes'

const baseFont = css`
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const Title = styled.p`
  ${baseFont}

  text-align: center;
  background-color: #ddd;
  line-height: 4.2rem;
  margin-bottom: 0;

  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`

const Download = styled.input.attrs({ type: 'button', value: 'Download' })`
  ${baseFont}

  text-align: center;
  border: 1px solid #999;
  border-radius: 3px;
  background-color: #eee;
  cursor: pointer;
  transition: background-color linear 0.1s;
  margin-left: 0.2rem;

  &:hover {
    background-color: #ccc;
  }

  &:focus {
    outline: none;
  }
`

const Container = styled.div`
  zoom: 50%;
`

export interface PreviewProps {
  theme: string
  title: string
  height: number
  width: number
  data?: { [key: string]: any }
}

export const Preview: React.FC<PreviewProps> = ({ title, width, height, theme, data }) => {
  const { snap } = useCapture()

  const previewRef = useRef<HTMLDivElement>(null)

  const View = ThemeList[theme].Preview
  const ViewDefaults = ThemeList[theme].Config.default

  const onClick = useCallback(() => {
    snap(previewRef, { file: 'splash.png' })
  }, [previewRef, snap])

  return (
    <Fragment>
      <Title>
        {title} - {width}x{height}px - <Download onClick={onClick} />
      </Title>

      <Container ref={previewRef}>
        <View {...ViewDefaults} {...data} />
      </Container>
    </Fragment>
  )
}
