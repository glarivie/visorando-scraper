import mongoose from 'mongoose'

const Hiking = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  title: { type: String },
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
    coordinate: {
      lat: { type: Number },
      lng: { type: Number },
    },
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
  images: { type: [String] },
  waypoints: [{
    index: { type: Number },
    step: { type: Number },
    elevation: { type: Number },
    latitude: { type: Number },
    longitude: { type: Number },
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

export default Hiking
