import { get, keys } from 'lodash';

import { days, months } from '../constants';

interface Timestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

const parseDate = (str: string): Timestamps => {
  const re = new RegExp(`(${keys(days).join('|')})\\s([0-3][0-9])\\s(${keys(months).join('|')})\\s(20[0-2][0-9])`, 'g');
  const matches = (str.match(re) || []).map((match: string) => {
    return match.split(' ').map(el => get(days, el, get(months, el, el))).join(' ');
  })

  return ({
    ...((matches && matches[0]) && { createdAt: new Date(matches[0]) }),
    ...((matches && matches[1]) && { updatedAt: new Date(matches[1]) }),
  });
};

export {
  parseDate,
};
