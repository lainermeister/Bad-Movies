const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const { getGenreList, getMovieList } = require("./helpers/apiHelpers.js");
const { saveMovie, getFavorites, deleteMovie } = require("../db/sql")

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../client/dist"));


app.get("/genres", function (req, res) {
  getGenreList()
    .then((genres) => res.send(genres))
    .catch((err) => res.sendStatus(404))
});

app.get("/search", function (req, res) {
  getMovieList(req.body.genre_id)
    .then((movies) => res.send(movies))
    .catch((err) => res.sendStatus(404))
});

app.post("/save", function (req, res) {
  saveMovie(req.body.movie)
    .then((data) => res.sendStatus(201))
    .catch((err) => res.sendStatus(500))
});

app.get("/favorites", function (req, res) {
  getFavorites()
    .then((movies) => res.send(movies))
    .catch((err) => res.sendStatus(404))
})
app.post("/delete", function (req, res) {
  // deleteMovie(req.body.id)
});

app.listen(3000, function () {
  console.log("listening on port 3000!");
});
