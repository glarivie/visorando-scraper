import 'dotenv/config'

import { getHikingDetails } from './models/scraper'
// import { extractWaypoints } from './models/waypoints'

const main = async (): Promise<void> => {
  const url = 'https://www.visorando.com/randonnee-le-lac-branlay/'
  const hiking = await getHikingDetails(url)

  // const waypoints = await extractWaypoints(hiking.id)

  console.debug(hiking.details)

  process.exit(0)
}

main()
