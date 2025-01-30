// models/HeroSection.js
import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true, // URL for the hero section background image
  },
  title: {
    type: String,
    required: true, // Title text (e.g., "Welcome to Elite FC")
  },
  subtitle: {
    type: String,
    required: true, // Subtitle text (e.g., "Where Legends Are Made")
  },
});

const HeroSection = mongoose.model('HeroSection', heroSectionSchema);
export default HeroSection;
