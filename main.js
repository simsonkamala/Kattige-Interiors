require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 500;

app.use(cors());
app.use(express.json());

// ✅ Serve imageList.json (if needed)
// app.use('/imagelist', express.static(path.join(__dirname, 'src/imageList.json')));
app.get('/imagelist', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'imageList.json'));
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/scrap-images`);
});
