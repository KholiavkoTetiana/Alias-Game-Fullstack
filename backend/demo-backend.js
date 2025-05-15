const express = require('express')
const port = 3000
const cors = require('cors')
const app = express()

app.use(cors())
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
        return res.status(404).json({error: 'Room not found'});
    }

    const teamsResult = await pool.query(`SELECT * FROM teams WHERE room_id = $1`, [roomId]);
    const teams = teamsResult.rows.map(team => ({
        id: team.id,
        roomId: team.room_id,
        name: team.name,
        score: team.score,
        isWinner: team.is_winner,
    }));
    const teamsDurationSeconds = await pool.query(`SELECT duration_seconds FROM teams WHERE room_id = $1 AND is_winner = true`, [roomId]);

    return {
        roomId: roomResult.rows[0].id,
        teams,
        activeTeamId: roomResult.rows[0].active_team_id,
        round: roomResult.rows[0].round,
        guessed: 0,
        skip: 0,
        winnerTeamId: roomResult.rows[0].winner_team_id,
        durationSeconds: teamsDurationSeconds.rows[0]?.duration_seconds || 0,
    };
}

app.use(express.json())

app.post('/games/new-room', async (req, res) => {  //створюємо нову пусту кімната для гри з її номером
    const result = await pool.query(`INSERT INTO rooms (round) VALUES (1) RETURNING id`);

    console.log("Resulttt: ", result)
    res.json({
        roomId: result.rows[0].id,
        teams: [],
        activeTeamId: null,
        round: 1,
        guessed: 0,
        skip: 0,
        winnerTeamId: null,
        duration_seconds: 0,
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

    if (!roomInfo) {
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
        return res.status(404).json({error: 'Room not found'});
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
        return res.status(404).json({error: 'Room not found'});
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
    if (!roomInfo) {
        return res.status(404).json({error: 'Room not found'});
    }
    res.json(roomInfo);
})

app.put('/games/:roomId/round/:number', async (req, res) => {     //встановлюємо раунду
    console.log('Викликали: /games/:roomId/round/:number')
    const roomId = parseInt(req.params.roomId)
    const round = parseInt(req.params.number)

    await pool.query('UPDATE rooms SET round = $1 WHERE id = $2', [round, roomId])

    const roomInfo = await getAllRoomInfo(roomId)
    if (!roomInfo) {
        return res.status(404).json({error: 'Room not found'});
    }
    res.json(roomInfo);
})

app.put('/games/:roomId/winner/:teamId', async (req, res) => { // встановити переможця
    console.log('Викликали: /games/:roomId/winner/:teamId')
    const roomId = parseInt(req.params.roomId)
    const winnerId = parseInt(req.params.teamId)
    await pool.query(`UPDATE rooms SET winner_team_id = $1 WHERE id = $2`,
        [winnerId, roomId])

    const roomInfo = await getAllRoomInfo(roomId)
    if (!roomInfo) {
        return res.status(404).json({error: 'Room not found'});
    }
    res.json(roomInfo);
})

app.put('/games/:roomId/teams/:teamName/is_winner/:isWinner', async (req, res) => {
    console.log('Викликали: /games/:roomId/teams/:teamName/score/:count')
    const roomId = parseInt(req.params.roomId)
    const teamName = req.params.teamName
    const isWinner = req.params.isWinner

    await pool.query('UPDATE teams SET is_winner = $1 WHERE room_id = $2 AND name LIKE $3', [isWinner, roomId, teamName])

    const roomInfo = await getAllRoomInfo(roomId)
    if (!roomInfo) {
        return res.status(404).json({error: 'Room not found'});
    }
    res.json(roomInfo);

})

app.put('/games/:roomId/active-team-id/:activeTeamIndex', async (req, res) => { //встановити активну команду
    console.log('Викликали: /games/:roomId/active-team-index/:activeTeamIndex')
    const roomId = parseInt(req.params.roomId)
    const activeTeamIndex = parseInt(req.params.activeTeamIndex)

    await pool.query(`UPDATE rooms SET active_team_id = $1 WHERE id = $2`,
        [activeTeamIndex, roomId])

    const roomInfo = await getAllRoomInfo(roomId)
    if (!roomInfo) {
        return res.status(404).json({error: 'Room not found'});
    }
    res.json(roomInfo);
})

app.put('/games/:roomId/teams/:teamName/duration_seconds/:durationSeconds', async (req, res) => {
    console.log('Викликали:/games/:roomId/teams/:teamName/duration_seconds/:durationSeconds')
    const roomId = parseInt(req.params.roomId)
    const teamName = req.params.teamName
    const durationSeconds = parseInt(req.params.durationSeconds)

    await pool.query('UPDATE teams SET duration_seconds = $1 WHERE room_id = $2 AND name LIKE $3', [durationSeconds, roomId, teamName])

    const roomInfo = await getAllRoomInfo(roomId)
    if (!roomInfo) {
        return res.status(404).json({error: 'Room not found'});
    }
    res.json(roomInfo);
})

app.get('/game_rating', async (req, res) => {
    console.log('/game_rating');
    try {
        const result = await pool.query(`
            SELECT t.room_id,
                   STRING_AGG(t.name, ', ')                               AS teams_name,
                   MAX(CASE WHEN t.is_winner THEN t.name END)             AS winner_name,
                   MAX(CASE WHEN t.is_winner THEN t.duration_seconds END) AS duration_seconds,
                   TO_CHAR(MIN(t.created_at), 'DD-MM-YYYY')               AS created_at
            FROM teams t
            GROUP BY t.room_id
            HAVING MAX(CASE WHEN t.is_winner THEN t.name END) IS NOT NULL
            ORDER BY duration_seconds ASC;
        `);

        res.json(result.rows);
    } catch (err) {
        console.error("Помилка при отриманні рейтингу:", err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.get('/get_words/:numberOfWords', async (req, res) => {
    console.log('/games/:roomId/get_words/:numberOfWords')
    try {
        const numberOfWords = parseInt(req.params.numberOfWords);
        const result = await pool.query('SELECT array(SELECT words.words FROM words ORDER BY RANDOM() LIMIT $1)', [numberOfWords]);

        res.json(result.rows[0].array);
    } catch (err) {
        console.error("Помилка при отриманні слів:", err);
        res.status(500).json({error: "Internal Server Error"});
    }

})


app.listen(port, () => {
    console.log((`Alias serwer work on http://localhost:${port} `))
})