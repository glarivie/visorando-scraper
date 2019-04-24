import { isEmpty, isNil, get } from 'lodash'

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

const getHikingDetails = async (hikingUrl: string): Promise<any> => {
  const document = await extractBody(hikingUrl)
  const content = document.querySelector('.innerContentVR')

  if (isNil(content)) return null

  const title = content.querySelector('h1[itemprop="name"]')
  const date = content.querySelector('.rando-date')
  const description = content.querySelector('p')

  const keys = content.querySelectorAll('.liste-topics-blanc-inner strong')
  const details = Array.from(keys).reduce((acc, element: Element) => {
    const value = get(element, 'nextSibling.textContent', '').trim()
    const key = (get(element, 'textContent', '') as string)
      .replace(':', '')
      .trim()

    return ({ ...acc, [key]: value })
  }, {})

  const aggregateRating = content.querySelector('#topics-rando .topic:first-child .topic-text p[itemprop="aggregateRating"]')
  const rating = (get(aggregateRating, 'textContent', '') as string)
    .split('\n')
    .map(el => el.trim())
    .filter(el => !isEmpty(el))

  return ({
    url: hikingUrl,
    title: (get(title, 'textContent', '') as string).trim(),
    date: get(date, 'textContent', ''),
    description: get(description, 'textContent', ''),
    ...details,
    rating,
  })
}

export {
  getRegionUrls,
  getHikingUrls,
  getHikingDetails,
}
