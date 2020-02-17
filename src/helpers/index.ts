import html2canvas from 'html2canvas'
import { useState } from 'react'

export const createElement = (tag: string, attributes: { [key: string]: any }) => {
  const item = document.createElement(tag)

  Object.keys(attributes).forEach(key => item.setAttribute(key, attributes[key]))

  return item
}

export const renderElement = (element: HTMLElement) => {
  return html2canvas(element, { useCORS: true })
}

export const downloadAsImage = async (element: HTMLElement, download = 'splash.png') => {
  const canvas = await renderElement(element)
  const href = canvas.toDataURL()

  createElement('a', { href, download }).click()
}

export function useNullableState<T>(value?: T) {
  return useState<T | undefined>(value)
}
