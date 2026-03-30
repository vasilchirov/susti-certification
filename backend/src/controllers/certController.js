const { readJson, writeJson } = require('../services/fileService');

const FILE = "data/certificates.json";
const FILE_SUMMARY = "data/summaries.json";

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
    const dataCert = readJson(FILE);
    const dataSummary = readJson(FILE_SUMMARY);

    let newId = dataCert.length
    const newCertificate = {
        "id": newId,
        "name": req.body['name'],
        "labels": req.body['labels'],
        "weights": req.body['weights']
    }

    const newSummary = {
        "id": newId,
        "summary": req.body['summary'],
        "links": req.body['links']
    }

    dataCert.push(newCertificate);
    dataSummary.push(newSummary);

    writeJson(FILE, dataCert);
    writeJson(FILE_SUMMARY, dataSummary);

    res.status(201).json(newCertificate);
}