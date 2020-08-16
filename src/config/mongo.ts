import mongoose from 'mongoose'

import Hiking from '../schemas/hiking'

const {
  MONGODB_USERNAME,
  MONGODB_PORT,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DATABASE,
} = process.env as { [k: string]: string }

const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  promiseLibrary: Promise,
  useUnifiedTopology: true,
}

// Create Mongo database connection
mongoose.connect(
  `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`,
  options,
)

mongoose.connection.on('connected', () => console.info('[MongoDB] is connected on port', MONGODB_PORT))
mongoose.connection.on('disconnected', () => console.warn('[MongoDB] is disconnected'))

// Register Models
mongoose.model('Hiking', Hiking)
