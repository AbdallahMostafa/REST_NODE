const path = require('path');

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const  mongoose  = require('mongoose');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

// app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); //application/json
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
app.use(cors())
app.use('/feed',feedRoutes);
app.use('/auth',authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message : message, data: data});
})

mongoose.connect(
    'mongodb+srv://bedo:root@cluster0.wpics.mongodb.net/test'
).then(result => {
    app.listen(8080);
}).catch(err => console.log(err))
