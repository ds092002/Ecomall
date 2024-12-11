const express = require('express');
const { request } = require('http');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT;
const morgon = require('morgan');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(morgon('dev'));
app.use(express.json());

/*--------------Admin Routes--------------*/

/*--------------User Routes--------------*/
const usersRoutes = require('./routes/users/index.routes')
app.use('/api/user', usersRoutes);

app.listen(port, async () => {
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log('DB is Connected Successfully.....👍🏻'))
    .catch((err) => console.log('DB is not Connected Successfully.....😔', err.message));
    console.log(`Server Start at http://localhost:${port}`);
})