const { readJson, writeJson } = require('../services/fileService');
const { processSurvey } = require('../services/surveyService');

exports.postSurvey = (req, res) => {
    const surveyRes = processSurvey(req.body);

    res.json(surveyRes);
}

exports.getQuestions = (req, res) => {
    const j = readJson("data/questions.json");

    res.json(j);
}