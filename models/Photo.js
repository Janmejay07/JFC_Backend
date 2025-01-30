// models/Photo.js
import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true, // URL to the image
  },
  alt: {
    type: String,
    required: true, // Alternative text for the image
  },
  description: {
    type: String, // Description of the photo (optional)
    default: '',
  },
}, { timestamps: true });

export default mongoose.model('Photo', photoSchema);
