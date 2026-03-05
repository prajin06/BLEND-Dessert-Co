const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.json({ success: true, data: { url: req.file.path } });
});

router.post('/multiple', protect, admin, upload.array('images', 5), (req, res) => {
  const urls = req.files.map((file) => file.path);
  res.json({ success: true, data: { urls } });
});

module.exports = router;
