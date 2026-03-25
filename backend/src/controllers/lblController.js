const { readJson } = require('../services/fileService');

const FILE = "data/labels.json";

exports.getAllLabels = (req, res) => {
    const data = readJson(FILE);

    res.json(data);
}