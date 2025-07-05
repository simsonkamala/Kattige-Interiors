// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors');
// // const mongoose = require('mongoose');
// const port = process.env.PORT || 500
// app.use(cors());
// app.use(express.json());

// // ----- Connecting to the mongodb -----
// // mongoose.connect(process.env.MONGODB_URL)
// // const db = mongoose.connection;
// // ----- Connecting to the mongodb -----

// // ---- For the Database Connection ----
// // db.on('error', () => {console.log("🗄️  DataBase Connection 🔗 Error ⚠️ ....")});
// // db.on('open', () => {console.log("🗄️  DataBase Connection 🔗 Successfull ✅ ✅.... ")});
// // ---- For the Database Connection ----

// // ---- Importing the Routes App ----
// const scrapImages = require("./src/puppeter/scrapeImages"); // ✅ just require it
// app.use("/scrap-images", async (req, res) => {
//     try {
//     const data = await scrapImages();
//     console.log('Scraped Data:', data); // ✅ check output in console
//     res.json(data);
//   } catch (err) {
//     console.error('Scraping error:', err);
//     res.status(500).json({ error: err.message });
//   }
// })
// // ---- Importing the Routes App ----

// // ----- Running the server -----
// app.listen(port, () => {
//     console.log(`💽 Server is running 🏃🏼‍♂️ on port number:500 = http://localhost:500/scrap-images`);
// })
// // ----- Running the server -----




require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const scrapImages = require('./src/puppeter/scrapeImages');

const app = express();
const port = process.env.PORT || 500;

app.use(cors());
app.use(express.json());

// ✅ Serve imageList.json (if needed)
app.use('/public', express.static(path.join(__dirname, 'src')));

// ✅ GET route for scraping images
app.get('/scrap-images', async (req, res) => {
  try {
    const data = await scrapImages();
    console.log('✅ Scraped Data:', data);
    res.json(data);
  } catch (err) {
    console.error('❌ Scraping error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/scrap-images`);
});
