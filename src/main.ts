import 'dotenv/config'

// import { getRegionUrls, getHikingUrls, getHikingDetails } from './models/scraper'
import { getHikingDetails } from './models/scraper'
// import { sleep } from './helpers/jsdom'

// const { SLEEP } = process.env

const main = async (): Promise<void> => {
  // const regionUrls = await getRegionUrls()
  // const hikingUrls = await getHikingUrls(regionUrls[0])
  // const hiking = await getHikingDetails(hikingUrls[0])
  const hiking = await getHikingDetails('https://www.visorando.com/randonnee-circuit-de-la-defriche/')

  console.log(hiking)

  process.exit(0)
}

main()
