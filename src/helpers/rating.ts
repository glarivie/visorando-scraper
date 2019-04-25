import { IRating } from '../types'

const parseRating = (arr: string[]): IRating => arr.reduce((acc, line) => {
  const [key, value] = line.split(':').map(el => el.trim())

  if (key.includes('Moyenne globale'))
    return ({ ...acc, average: parseFloat(value) })

  if (key.includes('Nombre d\'avis'))
    return ({ ...acc, count: parseInt(value, 10) })

  if (key.includes('Fiabilité de la description'))
    return ({ ...acc, description: parseFloat(value) })

  if (key.includes('Fiabilité du tracé sur carte'))
    return ({ ...acc, map: parseFloat(value) })

  if (key.includes('Intérêt du circuit de randonnée'))
    return ({ ...acc, route: parseFloat(value) })

  return acc
}, {})

export default parseRating
