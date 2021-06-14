const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const MONGODB_URL = 'mongodb://localhost/todolist';

app.use(express.json()); // body parser

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/todos', require('./routes/api/todos'));

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
