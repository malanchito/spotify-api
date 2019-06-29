const express = require('express')
const Playlist = require('./model.js')
const router=express.Router()
const Song = require('../song/model')

router.get('/playlists', function (req, res, next) {
    Playlist.findAll()
    .then(playlist => {res.json({ playlists: playlist })})
    .catch(err => {next(err)
      })
  })
router.post('/playlists', function (req, res,next) {
    Playlist.create(req.body)
    .then(playlist => res.status(201).json(playlist))
    .catch(err => {next(err)
      })
  })
router.get('/playlists/:id', function (req, res, next) {
    const id = req.params.id
    Song.findAll({where:{playlistId:id}})
    .then(songs => {res.json({ songs: songs.map(song=>song.title+' - '+song.artist) })})
    .catch(err => {next(err)
      })
  })
router.delete('/playlists/:id', function (req, res,next) {
    const id = req.params.id
    Playlist.destroy({where:{id:id}})
      .then(playlist => {res.json({ playlists: playlist })})
      .catch(err => {next(err)
      })
  })
  module.exports = router