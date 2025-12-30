const Track = require('../models/track');

// Create a track
exports.create = async (req, res) => {
  try {
    const { title, artist } = req.body;
    const track = await Track.create({ title, artist });
    res.status(201).json(track);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// List all tracks
exports.index = async (_req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 });
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single track
exports.show = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(track);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a track
exports.update = async (req, res) => {
  try {
    const { title, artist } = req.body;
    const updated = await Track.findByIdAndUpdate(
      req.params.id,
      { title, artist },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a track
exports.remove = async (req, res) => {
  try {
    const deleted = await Track.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
