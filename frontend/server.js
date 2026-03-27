const express = require('express');
const path = require('path');
const app = express();

// Serve everything inside UI (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'UI')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'UI/home/website.html'));
});

app.get('/summary', (req, res) => {
    res.sendFile(path.join(__dirname, 'UI/summary/summary.html'));
});

app.get('/questionnaire', (req, res) => {
    res.sendFile(path.join(__dirname, 'UI/questionnaire/questionnaire.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'UI/results/results.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`EcoCode is live at http://localhost:${PORT}`);
});