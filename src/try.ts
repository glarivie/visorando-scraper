import 'dotenv/config'

// import { getHikingDetails } from './models/scraper'
import { getGPXFile } from './models/scraper'
import { extractGPXData } from './models/gpx'

const main = async (): Promise<void> => {
  const url = 'https://www.visorando.com/randonnee-la-dordogne-touristique-a-domme/'
  // const hiking = await getHikingDetails(url)
  const file = await getGPXFile(url)

  console.debug(file)

  if (file) {
    const waypoints = await extractGPXData(file)

    console.debug(waypoints)
  }

  process.exit(0)
}

main()
