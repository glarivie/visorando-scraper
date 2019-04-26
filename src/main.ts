import 'dotenv/config'

// import './config/mongo'

import { getRegionUrls, getHikingUrls, getHikingDetails } from './models/scraper'
import getDistanceBetween from './helpers/geo'
// import { saveHiking } from './models/database'
// import { sleep } from './helpers/jsdom'

// const { SLEEP } = process.env

const main = async (): Promise<void> => {
  const regionUrls = await getRegionUrls()
  const hikingUrls = await getHikingUrls(regionUrls[0])
  const hiking = await getHikingDetails(hikingUrls[0])

  const eschbourg = {
    lat: 48.8127,
    lng: 7.29572,
  }

  // await saveHiking(hiking)
  // @ts-ignore
  console.log(getDistanceBetween(hiking.details.coordinate, eschbourg))

  process.exit(0)
}

main()
