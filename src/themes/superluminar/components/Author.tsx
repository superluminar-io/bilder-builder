import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
  position: absolute;
  bottom: 32px;
  display: flex;
  width: 70%;
  margin: 0 0 0 32px;
  align-items: center;
  border-radius: 1000px;
  -webkit-font-smoothing: antialiased;
`

const Text = styled.div`
  color: white;
  padding-left: 24px;
  padding-bottom: 8px;
`

const Name = styled.h2`
  font-size: 37px;
  line-height: 52px;
  font-weight: 600;
  color: #eee;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`

const Image = styled.img`
  height: 110px;
  border-radius: 50%;
  border: 4px solid white;
`

const Subline = styled.span`
  font-size: 24px;
  line-height: 30px;
  color: #ddd;
  display: inline-block;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
`

export interface AuthorProps {
  name: string
  description: string
  image: string
}

export const Author: React.FC<AuthorProps> = ({ name, description, image }) => (
  <Wrapper>
    <Image src={image} />
    <Text>
      <Name>{name}</Name>
      <Subline>
        {description} at <strong>superluminar GmbH</strong>
      </Subline>
    </Text>
  </Wrapper>
)
