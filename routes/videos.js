// routes/videos.js
import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

// Route to add a new video
router.post('/', async (req, res) => {
  const { title, description, imageUrl } = req.body;

  try {
    const newVideo = new Video({ title, description, imageUrl });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get a single video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a video by ID
router.put('/:id', async (req, res) => {
  const { title, description, imageUrl } = req.body;
  
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true }
    );
    if (!updatedVideo) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json(updatedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a video by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json({ message: 'Video deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
