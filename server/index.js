import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import users from './routes/users.js';

const app = express();



app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use('/users', users)

const CONNECTION_URL = 'mongodb+srv://admin:12345@cluster0.l2har.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`)))
    .catch((error) => console.log(error.message))
