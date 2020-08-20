import 'dotenv/config'

import { getHikingDetails } from './models/scraper'
// import { extractWaypoints } from './models/waypoints'

const main = async (): Promise<void> => {
  const url = 'https://www.visorando.com/randonnee-circuit-du-schiebenberg-a-dinsheim-sur-b/'
  const hiking = await getHikingDetails(url)

  // const waypoints = await extractWaypoints(hiking.id)

  console.debug(hiking)

  process.exit(0)
}

main()
