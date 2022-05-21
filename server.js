const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const uniqid = require('uniqid');
const notes = require('./db/db.json');

// Parses
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, notesArray) {
    // let note = body;
    notesArray.push(body);
    // fs.writeFile('./db/db.json', JSON.stringify(notesArray), err => {
    //     if (err) {
    //         console.error(err);
    //     }
    // });
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notesArray;
};

function filterOutNote(query, notesArray) {
    // let filteredResults = notesArray;
    fliteredResults = notesArray.filter(
        note => note.id == query);
    notesArray = notesArray.splice((notesArray).indexOf(fliteredResults), 1);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notesArray;
};

// API Routes
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    // Sets unique id
    req.body.id = uniqid();
    const note = createNewNote(req.body, notes);
    res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
    const newNote = filterOutNote(req.params.id, notes);
    res.json(newNote);
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