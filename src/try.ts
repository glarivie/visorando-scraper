import 'dotenv/config'

import { getHikingDetails } from './models/scraper'
import { extractWaypoints } from './models/waypoints'

const main = async (): Promise<void> => {
  const url = 'https://www.visorando.com/randonnee-sparsbach-en-passant-par-le-englishberg-/'
  const { id } = await getHikingDetails(url)

  const waypoints = await extractWaypoints(id)

  console.debug(waypoints)

  process.exit(0)
}

main()
