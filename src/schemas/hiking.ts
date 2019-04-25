import mongoose from 'mongoose'

const Hiking = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  overview: { type: String },
  details: {
    reference: { type: String },
    duration: { type: String },
    distance: { type: Number },
    vertical: {
      rise: { type: Number },
      drop: { type: Number },
    },
    altitude: {
      high: { type: Number },
      low: { type: Number },
    },
    difficulty: { type: String },
    loop: { type: Boolean },
    type: { type: String },
    region: { type: String },
    city: { type: String },
    zipCode: { type: Number },
    coordinate: { type: [String] },
  },
  steps: { type: [String] },
  rating: {
    average: { type: Number },
    count: { type: Number },
    description: { type: Number },
    map: { type: Number },
    route: { type: Number },
  },
  reviews: {
    author: { type: String },
    date: { type: Date },
    rating: { type: Number },
    description: { type: String },
  },
})

export default Hiking