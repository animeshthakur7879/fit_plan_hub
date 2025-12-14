const express = require('express');
const app = express();
require('dotenv').config();
const colors = require('colors');
const connectDB = require('./db_config/db_config');
const errorHandler = require('./Middlewares/errorHandler');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});     

app.use('/api/auth', require('./routes/auth/authRoutes'));

app.use('/api/plans' , require('./routes/trainer/trainerRoutes'));

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgGreen);
});