const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let words = ['mouse', 'school', 'task', 'exam', 'theory']
let wordIndex = 0;
let round = 0;
let score = 0

app.get('/', (req, res) => {
    res.send(`Game Alias work ${port}`)
})

app.post('/new-game', (req, res) => {
    round = 1;
    score = 0;
    wordIndex = 0;
    res.json({massage: 'New game'})
})

app.post('/correct', (req, res) => {
    score ++
    wordIndex ++;
    res.redirect('/round')
})

app.get('/next-word', (req, res) => {
    score ++
    wordIndex ++
    res.redirect('/round')
})

app.get('/round', (req, res) => {
    if (round > 0 && wordIndex < words.length){
        res.send(`
        <!DOCTYPE html>
<html lang="ea">
<head>
    <meta charset="UTF-8">
    <title>Alias</title>
</head>
<body>
<h1 id="word"><h1 id="word">${words[wordIndex]}</h1>
<form action="/correct" method="POST" style="display:inline;">
    <button type="submit">Вгадав</button>
</form>

<form action="/next-word" method="GET" style="display:inline;">
    <button type="submit">Не вгадав</button>
</form>
</body>
</html>

        `)
    }
})

app.listen(port, () => {
    console.log((`Alias serwer work on http://localhost:${port} `))
})