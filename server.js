const path = require('path');
const bodyParser = require('body-parser');
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: './config/config.env'})

connectDB();

const users = require('./routes/users')

const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.use(bodyParser.json());

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/users', users);

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', index.html)));
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
