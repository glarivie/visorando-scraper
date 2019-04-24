const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre']

interface IDates {
  createdAt?: Date;
  updatedAt?: Date;
}

const parseDate = (str: string): IDates => {
  const re = new RegExp(`(${days.join('|')})\\s([0-3][0-9])\\s(${months.join('|')})\\s(20[0-2][0-9])`, 'g')
  const matches = str.match(re)

  return ({
    ...((matches && matches[0]) && { createdAt: new Date(matches[0]) }),
    ...((matches && matches[1]) && { updatedAt: new Date(matches[1]) }),
  })
}

export {
  parseDate,
}
