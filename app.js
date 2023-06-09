// app.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const CronJob = require('cron').CronJob;
require('dotenv').config();

const app = express();

var pool = require("./routes/api/pool.js");
var {update_answer, update_pool} = require("./cron/cron.js");

var corsOptions = {
    origin: "http://"+process.env.ORIGIN
  };

connectDB();

var job = new CronJob(
  '0 0 0 * * *',
  update_answer,
  null,
  true,
  'America/Los_Angeles'
)
job.start()

var job = new CronJob(
  '0 50 23 * * *',
  update_pool,
  null,
  true,
  'America/Los_Angeles'
)
job.start()

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/pool", pool);
app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
