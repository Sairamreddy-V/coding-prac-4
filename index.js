//posting a player
app.post('/players/', async (request, response) => {
  const {body} = requset.body
  const {playerName, jerseyNumber, role} = body
  const addingPlayers = `
    INSERT INTO CRICKETTEAM(
      player_name,jersey_number,role
    )
    VALUES(
      ${playerName},
      ${jerseyNumber},
      ${role}
    )`
  const responseOnAdd = await db.run(addingPlayers)
  response.send(`PlayerAddedToTeam`)
})

// getting the single player
app.get('/players/:playerId', async (request, response) => {
  const {playerId} = request.params
  const gettingPlayers = `
    SELECT * FROM cricket_team WHERE player_id=${playerId}`
  const playesList = await db.get(gettingPlayers)
  response.send(playesList)
})

//updating player
app.put('/players/:playerId', async (request, response) => {
  const {playerId} = request.params
  const {body} = requset.body
  const {playerName, jerseyNumber, role} = body
  const addingPlayers = `
    UPDATE cricket_team
    SET 
      player_name=${playerName},
      jersey_number=${jerseyNumber},
      role=${role}
    
    WHERE player_id=${playerId}`
  const responseOnAdd = await db.run(addingPlayers)
  response.send(`Player Details Updated`)
})

//deleting a player from database
app.delete('/players/:playerId', async (request, response) => {
  const {playerId} = request.params
  const gettingPlayers = `
    DELETE * FROM CRICKETEAM WHERE PLAYERID=${playerId}`
  const playesList = await db.all(gettingPlayers)
  response.send(`Player Removed`)
})
