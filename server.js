const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const data = require('./db/db.json');

// Parses
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

function createNewNote(body, notesArray) {
    console.log(body);
    const note = body;
    notesArray.push(note);
    return note;
};


// API Routes
app.get("/api/notes", (req, res) => {
    res.json(data);
});

app.post("/api/notes", (req, res) => {
    console.log(req.body);
    // set id based on what the next index of the array will be
    req.body.id = data.length.toString();
    const note = createNewNote(req.body, data);
    res.json(note);
});

// app.delete("/api/notes/:id", (req, res) => {
//     res.json(data);
// });

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