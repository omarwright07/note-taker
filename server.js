const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db.json');
const uniqid = require('uniqid');

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
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

function filterOutNote(query, notesArray) {
    let filteredResults = notesArray;
    filteredResults = filteredResults.filter(
        note => note.id !== query);
    return filteredResults;
};

// API Routes
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    console.log(req.body);
    // set id based on what the next index of the array will be
    req.body.id = uniqid();
    const note = createNewNote(req.body, notes);
    res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
    console.log(notes);
    console.log(req.params.id);
    console.log(filterOutNote(req.params.id, notes));
    // res.json();
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
    console.log(`Note-Taker API Server now on port ${PORT}! http://localhost:3001`);
});