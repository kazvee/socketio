const express = require('express');
const morgan = require('morgan');

const port = 9001;

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome! 🌞');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}! 😃`);
});
