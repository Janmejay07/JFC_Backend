// routes/heroSection.js
import express from 'express';
import HeroSection from '../models/HeroSection.js';

const router = express.Router();

// GET hero section data
router.get('/', async (req, res) => {
  try {
    const heroSection = await HeroSection.findOne(); // Fetch the first hero section entry
    if (!heroSection) {
      return res.status(404).json({ message: 'Hero section data not found' });
    }
    res.json(heroSection);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hero section data', error });
  }
});

// POST new hero section data
router.post('/', async (req, res) => {
  try {
    const { imageUrl, title, subtitle } = req.body;
    const newHeroSection = new HeroSection({ imageUrl, title, subtitle });
    await newHeroSection.save();
    res.status(201).json(newHeroSection);
  } catch (error) {
    res.status(400).json({ message: 'Error creating hero section data', error });
  }
});

// PUT (update) hero section data
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, title, subtitle } = req.body;

    const updatedHeroSection = await HeroSection.findByIdAndUpdate(
      id,
      { imageUrl, title, subtitle },
      { new: true } // Return the updated document
    );

    if (!updatedHeroSection) {
      return res.status(404).json({ message: 'Hero section data not found' });
    }

    res.json(updatedHeroSection);
  } catch (error) {
    res.status(400).json({ message: 'Error updating hero section data', error });
  }
});

// DELETE hero section data
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHeroSection = await HeroSection.findByIdAndDelete(id);

    if (!deletedHeroSection) {
      return res.status(404).json({ message: 'Hero section data not found' });
    }

    res.json({ message: 'Hero section data deleted', deletedHeroSection });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hero section data', error });
  }
});

export default router;
