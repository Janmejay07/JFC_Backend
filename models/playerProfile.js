import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  color: { type: String, required: true },
});

const playerProfileSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  dob: { type: String, required: true }, // Use ISO format (YYYY-MM-DD) for better validation.
  age: { type: Number, required: true },
  position: { type: String, required: true },
  bio: { type: String, required: true },
  skills: { type: [skillSchema], required: true },
});

const PlayerProfile = mongoose.model('PlayerProfile', playerProfileSchema);

export default PlayerProfile;
