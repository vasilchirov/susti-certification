const { readJson, writeJson } = require('../services/fileService');

const labelsPath = "data/labels.json";
const questionsPath = "data/questions.json";
const certificatesPath = "data/certificates.json";

/**
 * Processes survey answers and calculates scores for each certificate.
 *
 * @param {Object} answers - User answers where key = question ID and value = selected answer.
 * Example:
 * {
 *   "1": "yes",
 *   "2": "no"
 * }
 *
 * @returns {Array<Object>} List of certificates with calculated scores.
 * Each object contains:
 * - name: {string} Certificate name
 * - labels: {Array<Object>} Label scores (label name → score)
 * - total: {number} Final weighted score
 */
exports.processSurvey = (answers) => {
    const labels = readJson(labelsPath);
    const questions = readJson(questionsPath);
    const certificates = readJson(certificatesPath);

    const labelsScores = Object.fromEntries(
        Object.keys(labels).map(key => [key, 0])
    );
    const labelsRecommendations = Object.fromEntries(
        Object.keys(labels).map(key => [key, []])
    )
    
    for (const [id, question] of Object.entries(questions)) {
        const ans = answers[id];
        for (const obj of question["a"][ans]) {
            const [lblID, score] = Object.entries(obj)[0];
            labelsScores[lblID] += score;

            const rec = question["rec"][ans];
            if (rec != "") {
                labelsRecommendations[lblID].push(question["rec"][ans]);
            }
        }
    }

    let certList = [];

    for (const cert of certificates) {
        let certLblScores = [];
        let recommendations = [];
        let total = 0;
        for (let i = 0; i < cert["labels"].length; i++) {
            const lblID = cert["labels"][i];
            const lblName = labels[lblID]
            const lblScore = Number(labelsScores[lblID].toFixed(2))
            certLblScores.push({ [lblName]: lblScore })
            recommendations.push({ [lblName]: labelsRecommendations[lblID]})

            total += lblScore * cert["weights"][i];
        }
        const resCert = {
            "id": cert["id"],
            "name": cert["name"],
            "labels": certLblScores,
            "recommendations": recommendations,
            "total": Number(total.toFixed(2))
        }

        certList.push(resCert);
    }

    return certList;
}