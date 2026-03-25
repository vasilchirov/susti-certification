const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const certificateRoutes = require('./routes/certificates');
const labelRoutes = require('./routes/labels');


app.use('/certificates', certificateRoutes);
app.use('/labels', labelRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});