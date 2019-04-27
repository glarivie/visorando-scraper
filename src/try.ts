import 'dotenv/config'

import { getHikingDetails } from './models/scraper'

const main = async (): Promise<void> => {
  const hiking = await getHikingDetails('https://www.visorando.com/randonnee-la-dordogne-touristique-a-domme/')

  console.debug(hiking)

  process.exit(0)
}

main()
