const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample Initial In-Memory Posts Data
let posts = [
  {
    id: 1,
    username: 'alex_snap',
    vibeTag: 'Late Night Grind ☕',
    timeTaken: '2m late',
    reactions: { fire: 12, heart: 8 },
    timestamp: new Date().toISOString()
  }
];

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', app: 'Snap Time API', version: '1.0.0' });
});

// 2. Fetch Daily Real Moments Feed
app.get('/api/feed', (req, res) => {
  res.status(200).json({ success: true, count: posts.length, posts });
});

// 3. Post a Real Moment (Upload dual photos & metadata)
app.post('/api/snap', (req, res) => {
  const { username, vibeTag, frontImage, backImage, voiceAudio } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required' });
  }

  const newPost = {
    id: posts.length + 1,
    username,
    vibeTag: vibeTag || 'Raw Moment ⚡',
    frontImage: frontImage || null,
    backImage: backImage || null,
    voiceAudio: voiceAudio || null,
    reactions: { fire: 0, heart: 0 },
    timestamp: new Date().toISOString()
  };

  posts.unshift(newPost);
  res.status(201).json({ success: true, message: 'Snap posted successfully!', post: newPost });
});

// 4. Trigger Daily Random Moment Notification (Cron Simulator)
app.post('/api/trigger-alert', (req, res) => {
  res.status(200).json({
    success: true,
    alertTime: new Date().toISOString(),
    message: '⚡ Daily Snap Time Alert sent to all users!'
  });
});

app.listen(PORT, () => {
  console.log(`Snap Time Server running on port ${PORT}`);
});
