import { isEmpty } from 'lodash'

import { extractBody } from '../helpers/jsdom'

const getRegionUrls = async (): Promise<string[]> => {
  const BASE_URL = 'https://www.visorando.com/'
  const document = await extractBody(BASE_URL)
  const scope = document.querySelectorAll('.content-col .module .content-module ul > li > a')

  return Array
    .from(scope)
    .map((element: Element) => element.getAttribute('href') || '')
    .filter(url => !isEmpty(url))
}

const getHikingUrls = async (regionUrl: string): Promise<string[]> => {
  const document = await extractBody(regionUrl)
  const scope = document.querySelectorAll('.content-innerContentWithHeader .rando .rando-title-sansDetail > a')

  return Array
    .from(scope)
    .map((element: Element) => element.getAttribute('href') || '')
    .filter(url => !isEmpty(url))
    .map(url => url.trim())
}

export {
  getRegionUrls,
  getHikingUrls,
}
