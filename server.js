const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const data = require('./db/db.json');

// API Routes
app.get("/api/notes", (req, res) => {
    res.json(data);
});

app.post("/api/notes", (req, res) => {
    let results = data;
  console.log(req.query)
  res.json(results);
});

// HTML Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Note-Taker API Server now on port ${PORT}!`);
});