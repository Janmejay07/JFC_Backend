// Import dependencies
import express from 'express';
import PlayerProfile from '../models/playerProfile.js';  // Update with the correct path to the model file

const router = express.Router();

// Routes

// Get all player profiles
router.get('/players', async (req, res) => {
    try {
        const players = await PlayerProfile.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single player profile by ID
router.get('/players/:id', async (req, res) => {
    try {
        const player = await PlayerProfile.findById(req.params.id);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new player profile
router.post('/players', async (req, res) => {
    const { _id, image, name, dob, age, position, bio, skills } = req.body;

    const newPlayer = new PlayerProfile({
        _id: new mongoose.Types.ObjectId(),
        image,
        name,
        dob,
        age,
        position,
        bio,
        skills,
    });

    try {
        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing player profile
router.put('/players/:id', async (req, res) => {
    try {
        const updatedPlayer = await PlayerProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPlayer) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a player profile
router.delete('/players/:id', async (req, res) => {
    try {
        const deletedPlayer = await PlayerProfile.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
