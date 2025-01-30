import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    league: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    score: { type: String, required: true },
    matchDate: { type: Date, required: true },
    jfcScorers: [
        {
            name: { type: String, required: true },
            minute: { type: Number, required: true },
        }
    ],
    fresherScorers: [
        {
            name: { type: String, required: true },
            minute: { type: Number, required: true },
        }
    ],
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
