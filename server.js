const express = require('express');
const app = express();
const PORT = process.env.PORT || 8089;
const qs = require('querystring');
const bp = require('body-parser');
const fs = require('fs');

app.use((req, res, next) => {
  console.log(`${req.method} request at: ${req.url}`);
  next();
});

app.use(bp.urlencoded({ extended: true }));

app.use(express.static('public'));
let nextId = 3
let totalScore = 0;
let buzzwords = [
    {
        id: 1,
        buzzword: 'pasta',
        points: 5
    },
    {
        id: 2,
        buzzword: 'spaghetti',
        points: 9
    }
    // {
    //     id: 3,
    //     buzzword: 'calzone',
    //     points: 7
    // },
    // {
    //     id: 4,
    //     buzzword: 'fettuccini',
    //     points: 10
    // },
    // {
    //     id: 5,
    //     buzzword: 'pizza',
    //     points: 5
    // }
]

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/buzzwords', (req, res) => {
    res.json(buzzwords);
})

app.post('/buzzwords', (req, res) => {
    console.log('req body', req.body)
    if(buzzwords.length < 5) {
        let buzzwordObject = req.body;
        buzzwordObject.id = nextId;
        nextId++;
        buzzwords.push(req.body);
        res.send(`{'success': OK}`);
    }
})

app.put('/buzzwords', (req, res) => {
    buzzwords.map(element => {
        if(element.buzzword === req.body.buzzword) {
            element.points = req.body.points;
        }
    })
    res.send(`{success: OK}`);
})

app.delete('/buzzwords', (req, res) => {
    buzzwords.map(element => {
        if(element.buzzword === req.body.buzzword) {
            console.log('element id', element.id)
            console.log(buzzwords)
            
            return buzzwords.splice(element.id-1, 1);
        }
    })

    // buzzwords.map(element => {
    //     if(element.buzzword === req.body.buzzword) {
    //         buzzwords = buzzwords.filter(element => {
    //         return element.buzzword !== req.body.buzzword;
    //         })
    //     }
    // })
    res.send(`{success: OK}`);
})

app.post('/reset', (req, res) => {
    buzzwords = [];
    totalScore = 0;
    res.send(`{success: OK`);
})

app.post('/heard', (req, res) => {
    buzzwords.map(element => {
    if(element.buzzword === req.body.buzzword) {
        totalScore += parseInt(element.points);
        return totalScore;
    }
    res.send(`{ "totalScore": ${totalScore} }`)
})
})

app.listen(PORT, () => {
    console.log(`Server has starting on port: ${PORT}`);
  });