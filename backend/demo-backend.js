const express = require('express')
const app = express()
const port = 3000

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

app.post('/games/new-room', (req, res) => {  //створюємо нову пусту кімната для гри з її номером
    let newRoomId = model.roomId++;
    let newRoom = {
        newRoomId,
        teams: [],
        activeTeamIndex: null,
        round: 1,
        guessed: 0,
        skip: 0,
        winner: null,
    };
    // model.push(newRoom)

    res.json(newRoom)
})

app.get('/games/:roomId', (req, res) => {       //отримаємо гру по номеру
    const roomId = parseInt(req.params.roomId)
    if(model.roomId === roomId){
        res.json(model)
    }else{
        return res.status(404).json({ error: 'Room not found' })
    }
})

app.post('/games/:roomId/teams/:teamName', (req, res) => { // додаємо нову створену команду в кімнату
    const roomId = parseInt(req.params.roomId)
    const teamName = req.params.teamName
    if(model.roomId === roomId){
        model.teams.push({name: teamName, score: 0})
    }else{
        return res.status(404).json({ error: 'Room not found' })
    }
    res.json(model)
})

app.delete('/games/:roomId/teams/:teamName', (req, res) => {
    const teamName = req.params.teamName
    const roomId = parseInt(req.params.roomId)
    if(model.roomId === roomId){
        for (let i = 0; i < model.teams.length; i++){
            if(model.teams[i].name === teamName){
                model.teams.splice(i, 1)
            }
        }

    }else{
        return res.status(404).json({ error: 'Room not found' })
    }
    res.json(model)
})

app.put('/games/:roomId/teams/:teamName/score/:count', (req, res) => { // встановлюємо рахунок після раунду
    const roomId = parseInt(req.params.roomId)
    const teamName = req.params.teamName
    const score = parseInt(req.params.count)
    if(model.teams.name === teamName && model.roomId === roomId){
        model.teams.score = score
    }else{
        return res.status(404).json({ error: 'Room not found' })
    }
    res.json(model)
})

app.put('/games/:roomId/round/:number', (req, res) => {     //встановлюємо  раунду
    const roomId = parseInt(req.params.roomId)
    const round = parseInt(req.params.number)
    if(model.roomId === roomId){
        model.round = round
    }else{
        return res.status(404).json({ error: 'Room not found' })
    }
    res.json(model)
})

app.put('/games/:roomId/winner/:teamIdx', (req, res) => {
    const roomId = parseInt(req.params.roomId)
    const winner = parseInt(req.params.teamIdx)
    if(model.roomId === roomId){
        model.winner = winner
    }else{
        return res.status(404).json({ error: 'Room not found' })
    }
    res.json(model)
})

app.put('/games/:roomId/active-team-index/:activeTeamIndex', (req, res) => {
    const roomId = parseInt(req.params.roomId)
    const activeTeamIndex = parseInt(req.params.activeTeamIndex)
    if(model.roomId === roomId){
        model.activeTeamIndex = activeTeamIndex
    }else{
        return res.status(404).json({ error: 'Room not found' })
    }
    res.json(model)
})


app.listen(port, () => {
    console.log((`Alias serwer work on http://localhost:${port} `))
})