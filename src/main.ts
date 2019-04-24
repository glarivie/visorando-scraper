import { getRegionUrls } from './models/scraper'

const main = async (): Promise<void> => {
  const regionUrls = await getRegionUrls()

  console.log(regionUrls)

  process.exit(0)
}

main()
