const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const trackCtrl = require('./controllers/tracks');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});

// Routes
app.post('/tracks', trackCtrl.create);
app.get('/tracks', trackCtrl.index);
app.get('/tracks/:id', trackCtrl.show);
app.put('/tracks/:id', trackCtrl.update);
app.delete('/tracks/:id', trackCtrl.remove);

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
