import 'dotenv/config';

import './config/mongo';

import { getRegionUrls, getHikingUrls, getHikingDetails } from './models/scraper';
import { extractWaypoints } from './models/waypoints';
import { saveHiking } from './models/database';
import { sleep } from './helpers/jsdom';

const { SLEEP } = process.env;

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p)
    process.exit(1)
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown')
    process.exit(1)
  });

const main = async (): Promise<void> => {
  const regionUrls = await getRegionUrls();

  for (const regionUrl of regionUrls) {
    const hikingUrls = await getHikingUrls(regionUrl);

    for (const hikingUrl of hikingUrls) {
      console.info(hikingUrl);

      const hiking = await getHikingDetails(hikingUrl);

      await sleep(Number(SLEEP));

      const waypoints = await extractWaypoints(hiking.id);

      await saveHiking({ ...hiking, waypoints });
      await sleep(Number(SLEEP));
    }
  }

  process.exit(0);
}

main();
