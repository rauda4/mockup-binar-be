const express = require('express');
const app = express();
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const routes = require('./Routes');
const cors = require('cors');
const handleCors = require('./middleware/cors');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(handleCors);
app.use(cookieParser());
app.use(flash());


// get api http://localhost:8080
app.use('/', routes);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'api running!!' });
});

app.listen(process.env.PORT, () => {
  console.log(`server connected http://localhost:${process.env.PORT}`);
});
