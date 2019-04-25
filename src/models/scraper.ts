import { isEmpty, isNil, get } from 'lodash'

import { extractBody } from '../helpers/jsdom'
import { parseDate } from '../helpers/date'
import { parseDetails } from '../helpers/details'
import parseRating from '../helpers/rating'

import { IHiking } from '../types'

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

const getHikingDetails = async (hikingUrl: string): Promise<IHiking> => {
  const document = await extractBody(hikingUrl)
  const content = document.querySelector('.innerContentVR')

  if (isNil(content))
    throw new Error(`Cannot target content at ${hikingUrl}`)

  const title = content.querySelector('h1[itemprop="name"]')
  const date = content.querySelector('.rando-date')
  const overview = content.querySelector('p')

  const description = content.querySelector('div[itemprop="description"]')
  const steps = isNil(description) ? [] : description.querySelectorAll('p')

  const reviews = content.querySelectorAll('#topics-rando .topic[itemprop="review"]')

  const topics = content.querySelector('.liste-topics-blanc-inner')
  const details = (get(topics, 'textContent', '') as string)
    .split('\n')
    .map(line => line.trim())
    .filter(line => !isEmpty(line))
    .map(line => line.split(':').map(el => el.trim()).join(': '))
    .join(' ')

  const aggregateRating = content.querySelector('#topics-rando .topic:first-child .topic-text p[itemprop="aggregateRating"]')
  const rating = (get(aggregateRating, 'textContent', '') as string)
    .split('\n')
    .map(el => el.trim())
    .filter(el => !isEmpty(el))

  return ({
    url: hikingUrl,
    title: (get(title, 'textContent', '') as string).trim(),
    ...parseDate(get(date, 'textContent', '') as string),
    overview: get(overview, 'textContent', '') as string,
    details: parseDetails(details),
    steps: Array
      .from(steps)
      .map((element: Element) => get(element, 'textContent', '') as string)
      .map((step: string) => step.replace(/\n/g, ' ')),
    rating: parseRating(rating),
    reviews: Array
      .from(reviews)
      .map((element: Element) => {
        const author = element.querySelector('.topic-info-auteur span[itemprop="author"] span[itemprop="name"]')
        const datePublished = element.querySelector('.topic-content meta[itemprop="datePublished"]')
        const date = isNil(datePublished) ? '' : datePublished.getAttribute('content')
        const rating = element.querySelector('.topic-content .topic-text div[itemprop="reviewRating"] span[itemprop="ratingValue"]')
        const description = element.querySelector('.topic-content .topic-text div[itemprop="description"] > p')

        return ({
          author: (get(author, 'textContent', '') as string).trim(),
          date: isNil(date) ? null : new Date(date),
          rating: parseFloat(get(rating, 'textContent', '0') as string),
          description: (get(description, 'textContent', '') as string).replace(/\n/g, ' '),
        })
      })
  })
}

export {
  getRegionUrls,
  getHikingUrls,
  getHikingDetails,
}
