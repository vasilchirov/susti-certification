const { readJson, writeJson } = require('../services/fileService');

const FILE = "data/summaries.json";

exports.getSummary = (req, res) => {
    const data = readJson(FILE);
    
    const id = req.params.id;
    const item = data.find(x => String(x.id) === id);

    res.json(item);
}