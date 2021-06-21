const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const port = proncess.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todolist';
const AppError = require('./AppError');

app.use(morgan('tiny'));
app.use(express.json()); // body parser

mongoose
  .connect(MONGODB_URI, {
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

//404 route
app.use((req, res, next) => {
  next(new AppError(404, 'Page Does Not Exist.'));
});

//custom error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  const { status = 500, message = 'Something Went Wrong!' } = err;
  res.status(status).json({ status, error: message });
});

//Serve static files
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
