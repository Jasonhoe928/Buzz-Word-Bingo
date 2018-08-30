//what /spell/:id
//what is the function of res.redirect
//how does res.json work


const express = require('express');
const app = express();
const bp = require('body-parser');

app.use(bp.urlencoded({ extended: true }));

let nextId = 3;
const spells = [
  {
    id: 1,
    name: 'Magic Missiles',
    damage: 10
  },
  {
    id: 2,
    name: 'Frost Shield',
    damage: -100
  }
];

app.get('/getallspells', (req, res) => {
  res.json(spells);
});

app.get('/spell/:id/', (req, res) => {
  const { id } = req.params; //what is this {id} syntax, what does it do? //:id is an attribute on req.params, :id = req.params.id
  // const resData = spells.filter(item => item.id === id);
  const resData = spells.filter(item => { //filters elements in spells array (objects) to see if item.id === to id, returns an array of items where item.id === id
    return item.id == id; //why not strictly equals?
  });

  console.log('resData', resData);
  res.json(resData[0]); //takes the first element of resData, puts it into json and sends it back in a response 
});

app.post('/addspell', (req, res) => {
  debugger;
  console.log('req.body', req.body);
  let spellObject = req.body;
  spellObject.id = nextId;
  spells.push(spellObject);
  res.redirect(`/spell/${nextId}`);
  nextId++;
});

app.delete('/removespell/:id', (req, res) => {
  //...
})

app.listen(8090, () => {
  console.log('APP IZ UP');
});