// routes/photos.js
import express from 'express';
import Photo from '../models/Photo.js';

const router = express.Router();

// Route to add a new photo
router.post('/', async (req, res) => {
  const { src, alt, description } = req.body;

  try {
    const newPhoto = new Photo({ src, alt, description });
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json(photos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get a single photo by ID
router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });
    res.status(200).json(photo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a photo by ID
router.put('/:id', async (req, res) => {
  const { src, alt, description } = req.body;
  
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(
      req.params.id,
      { src, alt, description },
      { new: true }
    );
    if (!updatedPhoto) return res.status(404).json({ message: 'Photo not found' });
    res.status(200).json(updatedPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a photo by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPhoto = await Photo.findByIdAndDelete(req.params.id);
    if (!deletedPhoto) return res.status(404).json({ message: 'Photo not found' });
    res.status(200).json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
