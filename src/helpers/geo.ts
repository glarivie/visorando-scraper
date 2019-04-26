import { ICoordinate } from '../types'

const deg2rad = (deg: number): number => deg * (Math.PI / 180)

// Return distance between two points in km
const getDistanceBetween = (start: ICoordinate, end: ICoordinate): number => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(end.lat - start.lat)
  const dLon = deg2rad(end.lng - start.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(start.lat)) * Math.cos(deg2rad(end.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km

  return d
}

export default getDistanceBetween
