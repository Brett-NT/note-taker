const fs = require('fs');
const path = require('path');
const generateUniqueId = require('generate-unique-id');
const id = generateUniqueId();

module.exports = app => {

    fs.readFile("./db/db.json","utf8", (err, data) => {

        if(err) {
            throw err;
        }

        var notes = JSON.parse(data);
        // Sets the api/notes get route
        app.get('/api/notes', (req, res) => {
            console.log(notes);
            res.json(notes);
        });

        // Sets the api/notes post route
        app.post("/api/notes", (req, res) => {
            console.log("req.body", req.body);
            req.body.id = id;
            console.log("req.body", req.body);
            let newNote = req.body;
            notes.push(newNote);
            updateDB(res);
            return console.log(`New note added.`);
        });

        // Get route for notes using ID
        app.get("/api/notes/:id", (req,res) => {
            res.json(notes[req.params.id]);
        });

        // Delete notes
        app.delete("/api/notes/:id", (req, res) => {
            for (let i = 0; i < notes.length; i++) {
                console.log(notes[i].id, req.params.id);
                if(notes[i].id === req.params.id) {
                    notes.splice(i, 1);
                    updateDB(res);
                }
            }
        });

        // Used to update the db.json file with new note
        function updateDB(res) {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if(err) {
                    throw err;
                }
                res.json(notes);
            });
        }
    });
}