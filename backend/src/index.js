const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors({ origin: 'http://localhost:5000' })); 
app.use(express.json());

const certificateRoutes = require('./routes/certificates');
const labelRoutes = require('./routes/labels');
const surveyRoutes = require('./routes/survey');
const summaryRoutes = require('./routes/summaries')

app.use('/certificates', certificateRoutes);
app.use('/labels', labelRoutes);
app.use('/survey', surveyRoutes);
app.use('/summary', summaryRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});