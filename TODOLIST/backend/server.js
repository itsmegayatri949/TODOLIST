require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

app.get('/', (req, res) => res.send('Todo API is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
