const express = require('express')
const app = express()
const port = 3000

const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'alias_db',
    password: 'alias_db',
    database: 'postgres',
    port: 5432,
});
// module.exports = pool;

async function getAllRoomInfo(roomId) {
    const roomResult = await pool.query(`SELECT * FROM rooms WHERE id = $1`, [roomId]);
    if (roomResult.rows.length === 0) {
        return res.status(404).json({ error: 'Room not found' });
    }

    const teamsResult = await pool.query(`SELECT * FROM teams WHERE room_id = $1`, [roomId]);
    const teams = teamsResult.rows.map(team => ({
        id: team.id,
        roomId: team.room_id,
        name: team.name,
        score: team.score
    }));

    return {
        roomId: roomResult.rows[0].id,
        teams,
        activeTeamId: roomResult.rows[0].active_team_id,
        round: roomResult.rows[0].round,
        guessed: 0,
        skip: 0,
        winnerTeamId: roomResult.rows[0].winner_team_id,
    };
}

app.use(express.json())

let model = {
    roomId: 12,
    teams: [
        {
            name: 'team1',
            score: 5,
        },

    ],
    activeTeamIndex: null,
    round: 1,
    guessed: 0,
    skip: 0,
    winner: null,
}

app.post('/games/new-room', async (req, res) => {  //створюємо нову пусту кімната для гри з її номером
    const result = await pool.query(`INSERT INTO rooms (round)
                                     VALUES (1) RETURNING id`);

    console.log("Resulttt: ", result)
    res.json({
        roomId: result.rows[0].id,
        teams: [],
        activeTeamId: null,
        round: 1,
        guessed: 0,
        skip: 0,
        winnerTeamId: null,
    })
})

app.get('/rooms', async (req, res) => {
    const result = await pool.query("SELECT * FROM rooms");
    console.log("Resulttt: ", result)
    res.json(result.rows)
})


app.get('/games/:roomId', async (req, res) => {       //отримаємо гру по номеру
    console.log('Викликали: /games/:roomId')
    const roomId = parseInt(req.params.roomId)
    const roomInfo = await getAllRoomInfo(roomId);

    if(!roomInfo){
        return res.status(404).json({error: 'Room not found'})
    }
    res.json(roomInfo);
})

app.post('/games/:roomId/teams/:teamName', async (req, res) => { // додаємо нову створену команду в кімнату
    console.log('Викликали: /games/:roomId/teams/:teamName')
    const roomId = parseInt(req.params.roomId)
    const teamName = req.params.teamName

    await pool.query(
        `INSERT INTO teams (room_id, name, score) VALUES ($1, $2, 0)`,
        [roomId, teamName]
    );

    const roomInfo = await getAllRoomInfo(roomId);

    if (!roomInfo) {
        return res.status(404).json({ error: 'Room not found' });
    }
    res.json(roomInfo);

})

app.delete('/games/:roomId/teams/:teamName', async (req, res) => { // встановити видалити створену команду
    console.log('Викликали: /games/:roomId/teams/:teamName')
    const teamName = req.params.teamName
    const roomId = parseInt(req.params.roomId)

    await pool.query(
        `DELETE FROM teams WHERE room_id = $1 AND name LIKE $2`,
        [roomId, teamName]
    );

    const roomInfo = await getAllRoomInfo(roomId)
    if (!roomInfo) {
        return res.status(404).json({ error: 'Room not found' });
    }
    res.json(roomInfo);
})

app.put('/games/:roomId/teams/:teamName/score/:count', async (req, res) => { // встановлюємо рахунок після раунду
    console.log('Викликали: /games/:roomId/teams/:teamName/score/:count')
    const roomId = parseInt(req.params.roomId)
    const teamName = req.params.teamName
    const score = parseInt(req.params.count)

    await pool.query('UPDATE teams SET score = $1 WHERE room_id = $2 AND name LIKE $3', [score, roomId, teamName])

    const roomInfo = await getAllRoomInfo(roomId)
    if(!roomInfo){
        return res.status(404).json({ error: 'Room not found' });
    }
    res.json(roomInfo);
})

app.put('/games/:roomId/round/:number', async (req, res) => {     //встановлюємо раунду
    console.log('Викликали: /games/:roomId/round/:number')
    const roomId = parseInt(req.params.roomId)
    const round = parseInt(req.params.number)

    await pool.query('UPDATE rooms SET round = $1 WHERE id = $2', [round, roomId])

    const roomInfo = await getAllRoomInfo(roomId)
    if(!roomInfo){
        return res.status(404).json({ error: 'Room not found' });
    }
    res.json(roomInfo);
})

app.put('/games/:roomId/winner/:teamIdx', async (req, res) => {
    console.log('Викликали: /games/:roomId/winner/:teamIdx')
    const roomId = parseInt(req.params.roomId)
    const winner = parseInt(req.params.teamIdx)
    await pool.query(`UPDATE rooms SET winner_team_id = $1 WHERE id = $2`,
        [winner, roomId])

    const roomInfo = await getAllRoomInfo(roomId)
    if(!roomInfo){
        return res.status(404).json({ error: 'Room not found' });
    }
    res.json(roomInfo);
})

app.put('/games/:roomId/active-team-index/:activeTeamIndex', async (req, res) => { //встановити активну команду
    console.log('Викликали: /games/:roomId/active-team-index/:activeTeamIndex')
    const roomId = parseInt(req.params.roomId)
    const activeTeamIndex = parseInt(req.params.activeTeamIndex)

    await pool.query(`UPDATE rooms SET active_team_id = $1 WHERE id = $2`,
        [activeTeamIndex, roomId])

    const roomInfo = await getAllRoomInfo(roomId)
    if(!roomInfo){
        return res.status(404).json({ error: 'Room not found' });
    }
    res.json(roomInfo);
})


app.listen(port, () => {
    console.log((`Alias serwer work on http://localhost:${port} `))
})