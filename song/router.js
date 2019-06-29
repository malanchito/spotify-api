const express = require('express')
const Song = require('./model.js')
const router=express.Router()
router.post('/playlists/:id/songs', function (req, res,next) {
    const song = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        playlistId: req.params.id
    }
    Song.create(song)
    .then(song => res.status(201).json(song))
    .catch(err => {next(err)
      })
  })

  module.exports = router