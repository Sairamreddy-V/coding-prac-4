const express = require('express')
const app = express()
app.use(express.json())

const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const {open} = require('sqlite')

const path = require('path')
const filePath = path.join(__dirname, 'cricketTeam.db')

let db = null

const intialieDbAndServer = async () => {
  try {
    db = await open({
      filename: filePath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log(`server Running....`)
    })
  } catch (error) {
    console.log(`db.Error:${error.message}`)
    process.exit(1)
  }
}
intialieDbAndServer()

const convertToDbobjectToResponseObject = eachplayer => {
  return {
    playerId: eachplayer.player_id,
    playerName: eachplayer.player_name,
    jerseyNumber: eachplayer.jersey_number,
    role: eachplayer.role,
  }
}

//geting all playes in database
app.get('/', async (request, response) => {
  const getPlayersQuery = `
  SELECT
  *
  FROM
    cricket_team;`
  let playersArray = await db.all(getPlayersQuery)
  response.send(playersArray)
})

module.exports = app
