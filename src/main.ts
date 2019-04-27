import 'dotenv/config'

import './config/mongo'

import { getRegionUrls, getHikingUrls, getHikingDetails } from './models/scraper'
import { saveHiking } from './models/database'
import { sleep } from './helpers/jsdom'

const { SLEEP } = process.env

const main = async (): Promise<void> => {
  const regionUrls = await getRegionUrls()

  for (const regionUrl of regionUrls) {
    const hikingUrls = await getHikingUrls(regionUrl)

    for (const hikingUrl of hikingUrls) {
      const hiking = await getHikingDetails(hikingUrl)

      await saveHiking(hiking)
      await sleep(Number(SLEEP))

      console.info(hiking.title)
    }
  }

  process.exit(0)
}

main()
