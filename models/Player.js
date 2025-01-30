import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    number: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, required: true },
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
