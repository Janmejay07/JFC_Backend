// routes/standingsRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import Standing from '../models/Standing.js';

const router = express.Router();

// Get all standings
router.get('/', async (req, res) => {
  try {
    const standings = await Standing.find().sort({ pos: 1 }); // Sort by position
    res.json(standings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add standings (bulk insert)
router.post('/', async (req, res) => {
  try {
    const standings = req.body; // Expect an array of standings
    await Standing.insertMany(standings);
    res.status(201).json({ message: 'Standings added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a specific player's standing by ID
router.get('/:id', async (req, res) => {
  try {
    const standing = await Standing.findById(req.params.id);
    if (!standing) {
      return res.status(404).json({ message: 'Player not found in standings' });
    }
    res.json(standing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a specific player's standing
router.put('/:id', async (req, res) => {
  try {
    const updatedStanding = await Standing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedStanding) {
      return res.status(404).json({ message: 'Player not found in standings' });
    }
    res.json(updatedStanding);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH route to update player stats
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is in correct MongoDB format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Player ID" });
    }

    const updatedPlayer = await Standing.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
