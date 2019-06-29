const Sequelize = require('sequelize')
const db = require('../db.js')
const User = require('../user/model')

const Playlist = db.define(
    'playlist',
    {
      name: {
        type: Sequelize.STRING,
        field: 'playlist_name'
      }
    }
  )
Playlist.belongsTo(User)

module.exports = Playlist
  