// models/Video.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // URL to the image or thumbnail for the video
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
