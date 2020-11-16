require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./db');

const controllers = require('./controllers')
app.use(express.json())
db.sync();

app.use('/user', controllers.usercontroller)
app.use('/log', controllers.logcontroller)

app.listen(process.env.PORT, function(){
    console.log(`App is listening on port ${process.env.PORT}`);
})