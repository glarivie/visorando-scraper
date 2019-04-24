import axios from 'axios'
import { JSDOM } from 'jsdom'
import { isNil } from 'lodash'

const extractBody = async (url: string): Promise<Document> => {
  const { data: html } = await axios.get(url)

  if (isNil(html))
    throw new Error(`Cannot get content with ${url}`)

  const { window: { document } } = new JSDOM(html, { contentType: 'text/html' })

  return document
}

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export {
  extractBody,
  sleep,
}
