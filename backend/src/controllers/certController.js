const { readJson, writeJson } = require('../services/fileService');

const FILE = "data/certificates.json";

exports.getAllCertificates = (req, res) => {
    const data = readJson(FILE)
    res.json(data)
}

exports.getCerificate = (req, res) => {
    const id = req.params.id;
    const data = readJson(FILE);

    const item = data.find(x => String(x.id) === id);
    res.json(item);
}

exports.addCertificate = (req, res) => {
    const data = readJson(FILE);

    let newId = data.length
    const newItem = {
        "id": newId,
        "name": req.body['name'],
        "labels": req.body['labels'],
        "weights": req.body['weights']
    } 

    data.push(newItem);

    writeJson(FILE, data);

    res.status(201).json(newItem);
}