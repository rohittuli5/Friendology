const express = require("express");
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI.toString()
mongoose.connect(uri, { useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, '../frontend/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
// });

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});