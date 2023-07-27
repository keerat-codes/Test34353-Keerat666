const express = require('express');
var cors = require('cors')
const app = express();
const path = require('path');
const PORT = 8000;

require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const conn = require('./middlewares/tidb');
console.log("Trying to establish a connection to TiDB...");

if (conn) {
  console.log("Connection to TiDB successful");
  var adminBroRouter = require('./routes/admin_bro');
  //setting up admin bro
  app.use('/admin', adminBroRouter)
} else {
  console.log("Connection to TiDB failed");
}


//Please don't delete this health API
var usersRouter = require('./routes/user_routes');
app.use('/api/health', (req, res) => {
    res.send('Hello Autopilot');
  });

  //remove this later on
var usersRouter = require('./routes/user_routes');
app.use('/api/${model}', usersRouter);


app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

module.exports = app;