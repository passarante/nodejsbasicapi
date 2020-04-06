const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'.yellow.bold));

mongoose.connection.on('error', (err) =>
  console.log(`MongoDB Connection error: ${err.message}`.red.bold)
);

const postRoutes = require('./routes/post');

const app = express();
app.use(morgan('dev'));

app.use('/', postRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.green.bold);
});
