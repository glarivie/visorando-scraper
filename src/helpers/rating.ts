import { Rating } from '../types'

const toFloat = (v: string): number => parseFloat(v.replace('Non utilisé', '0'))

const toInt = (v: string): number => parseInt(v.replace('Non utilisé', '0'), 10)

const parseRating = (arr: string[]): Rating => arr.reduce((acc, line) => {
  const [key, value] = line.split(':').map(el => el.trim())

  if (key.includes('Moyenne globale'))
    return ({ ...acc, average: toFloat(value) })

  if (key.includes('Nombre d\'avis'))
    return ({ ...acc, count: toInt(value) })

  if (key.includes('Fiabilité de la description'))
    return ({ ...acc, description: toFloat(value) })

  if (key.includes('Fiabilité du tracé sur carte'))
    return ({ ...acc, map: toFloat(value) })

  if (key.includes('Intérêt du circuit de randonnée'))
    return ({ ...acc, route: toFloat(value) })

  return acc
}, {})

export default parseRating
