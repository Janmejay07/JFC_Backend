import express from 'express';
import AboutSection from '../models/AboutSection.js'; // Import the AboutSection model
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Define __filename and __dirname for ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (images) from the assets folder
router.use('/assets', express.static(path.join(__dirname, '../assets')));

// Route to get About Section data
router.get('/', async (req, res) => {
  try {
    const aboutSection = await AboutSection.findOne(); // Fetch the first document
    if (!aboutSection) {
      return res.status(404).json({ message: 'About Section not found' });
    }
    res.json(aboutSection);
  } catch (error) {
    console.error('Error fetching About Section data:', error);
    res.status(500).json({ error: 'Failed to fetch About Section data' });
  }
});

// Route to create or update About Section data without image upload
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  try {
    let aboutSection = await AboutSection.findOne();

    if (aboutSection) {
      // Update existing data
      aboutSection.title = title;
      aboutSection.description = description;
    } else {
      // Create new data
      aboutSection = new AboutSection({ title, description });
    }

    await aboutSection.save();
    res.json({ message: 'About Section data saved successfully', aboutSection });
  } catch (error) {
    console.error('Error saving About Section data:', error);
    res.status(500).json({ error: 'Failed to save About Section data' });
  }
});

export default router;
