const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/user';

const app = express();

mongoose.connect(url, {useNewUrlParser:true})
const conn = mongoose.connection;

conn.on('open', () =>{
    console.log('Connected!');
})

app.use(express.json());

const userRouter = require('./Routers/router');
app.use('/user', userRouter);

app.listen(9000, () => {
    console.log('Server connected!');
})

