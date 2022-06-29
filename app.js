const express = require('express');
const mongoose = require('mongoose');
const route = require('./router/router');
require('dotenv').config();
const app = express();

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(express.json());

app.use('/api', route);
// mongodb://localhost:27017/my_basecamp
// process.env.DB_URL

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on ${process.env.PORT}`);
    })
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection: ' + err.message);
  }
});