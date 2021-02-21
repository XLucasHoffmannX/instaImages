// dependencies externs
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");
// dependencies interns
const scrapingLost = require('./scrap/scrapList');

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/pupGenerator', (req, res) => {
    res.render('./pages/generator')
    const url = req.query.link
    scrapingLost(url);
})

fs.readFile("./insta.json", "utf8", async function (err, data) {
    if (err) {
        return console.log("Erro ao ler arquivo");
    }
    let archive =  await JSON.parse(data); 
    app.get('/results', async (req, res) => {
        res.render('./pages/results', { archive })
    })
});


app.listen(3015, console.log('Server in on port 3015'))