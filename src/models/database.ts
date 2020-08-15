import { Document, model } from 'mongoose'

import { Hiking } from '../types'

const Hiking = model('Hiking')

const saveHiking = async (hiking: Hiking): Promise<Document> => {
  const { url } = hiking

  return Hiking
    .findOneAndUpdate({ url }, hiking, { upsert: true, new: true })
    .exec()
}

export {
  saveHiking,
}
