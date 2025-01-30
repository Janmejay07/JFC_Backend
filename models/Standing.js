import mongoose from 'mongoose';

// Define the Standing schema
const StandingSchema = new mongoose.Schema({
  player: { type: String, required: true },
  p: { type: Number, default: 0 },  // Matches played
  w: { type: Number, default: 0 },  // Wins
  d: { type: Number, default: 0 },  // Draws
  l: { type: Number, default: 0 },  // Losses
  g: { type: Number, default: 0 },  // Goals scored
  a: { type: Number, default: 0 },  // Assists
  s: { type: Number, default: 0 },  // Shots
  pt: { type: Number, default: 0 }  // Points
});

// Create and export the Standing model
const Standing = mongoose.model('Standing', StandingSchema);
export default Standing;
