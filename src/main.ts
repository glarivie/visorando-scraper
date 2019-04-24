import 'dotenv/config'

import { getRegionUrls, getHikingUrls } from './models/scraper'
// import { sleep } from './helpers/jsdom'

// const { SLEEP } = process.env

const main = async (): Promise<void> => {
  const regionUrls = await getRegionUrls()
  const hikingUrls = await getHikingUrls(regionUrls[0])

  console.log(hikingUrls)

  process.exit(0)
}

main()
