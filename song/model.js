const Sequelize = require('sequelize')
const db = require('../db.js')
const Playlist = require('../playlist/model')

const Song = db.define(
    'song',
    {
        title: {
            type: Sequelize.STRING,
            field: 'song_name'
        },
        artist: {
            type: Sequelize.STRING,
            field: 'song_artist'
        },
        album: {
            type: Sequelize.STRING,
            field: 'song_album'
        }
    }
)
Song.belongsTo(Playlist)

module.exports = Song
  