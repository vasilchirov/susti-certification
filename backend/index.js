const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/certificates', (req, res) => {
    fs.readFile('data/certificates.json', 'utf8', (err, jsonString) => {
        if (err)
            return console.log(err);
        const data = JSON.parse(jsonString);
        res.json(data);
    })
});

app.get('/certificates/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('data/certificates.json', 'utf8', (err, jsonString) => {
        if (err)
            return console.log(err);
        const data = JSON.parse(jsonString);
        const item = data.find(c => String(c.id) === id);
        res.json(item);
    })
})

app.get('/labels', (req, res) => {
    fs.readFile('data/labels.json', 'utf8', (err, jsonString) => {
        if (err) return console.log(err);
        const data = JSON.parse(jsonString);
        res.json(data);
    })
})

app.post('/certificate', (req,res) => {
    const jsonString = fs.readFileSync('data/certificates.json', 'utf8')
    const data = JSON.parse(jsonString)

    let newId = data.length
    const newItem = {
        "id": newId,
        "name": req.body['name'],
        "labels": req.body['labels'],
        "weights": req.body['weights']
    } 

    data.push(newItem)
    
    fs.writeFileSync('data/certificates.json', JSON.stringify(data, null, 2));

    res.status(201).json(newItem)
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});