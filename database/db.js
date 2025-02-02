const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => console.log('✅ Connected to database'));
db.on('error', (err) => console.error('❌ Database connection error:', err));
db.on('disconnected', () => console.log('⚠️ Disconnected from database'));

module.exports = db;
