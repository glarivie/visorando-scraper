import { extractBody } from '../helpers/jsdom'

const getRegionUrls = async () => {
  const BASE_URL = 'https://www.visorando.com/'
  const document = await extractBody(BASE_URL)
  const scope = document.querySelectorAll('.content-col .module .content-module > div > a')

  return Array
    .from(scope)
    .map((element: Element)=> element.getAttribute('href'))
}

export {
  getRegionUrls,
}
