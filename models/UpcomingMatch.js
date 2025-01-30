import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    league: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    score: { type: String, required: true },
    date: { type: Date, required: true },  // Changed from 'matchDate' to 'date'
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

const UpcomingMatch = mongoose.model('UpcomingMatch', matchSchema);

export default UpcomingMatch;
