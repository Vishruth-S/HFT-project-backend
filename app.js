var cors = require('cors')
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session);
const auth = require('./middlewares/auth')
const morgan = require("morgan");

const app = express()
// app.use(cors({
//     origin: '*'
// }));

const whitelist = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://localhost:3000/',
    'http://192.168.56.1'
]
const corsOptions = {
    origin(origin, callback) {
        if (!origin) {
            // for mobile app and postman client
            return callback(null, true)
        }
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: '*',
    'Access-Control-Request-Headers': '*',
}

app.use(cors(corsOptions))

mongoose
    .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('DB Connected'));

const store = new MongoDBSession({
    uri: process.env.DB,
    collection: 'Mysessions'
});

app.use(express.json())
app.use(morgan("tiny"));
app.use('/images', express.static('images'))
app.use(session({
    secret: process.env.SECRET,
    resave: false,                // Not creating  a new cookie for every request
    saveUninitialized: false,
    store: store,
}))

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/post', require('./routes/postRoutes'))

////// TEST/////////
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening for request at ${process.env.PORT}`)  
})
