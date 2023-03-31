import express  from 'express';
import mongoose  from "mongoose" ;
import * as dotenv from 'dotenv';
import cors  from 'cors';
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }))
app.use(cors());
dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.db}`)
    .then((res) => {
        app.listen(process.env.PORT , () => {
            console.log('this jwt project: ' + process.env.PORT)
        })
        console.log('success jwt project ')
    })
    .catch((err) => { console.log(err) })

//route to login  
const login = require('./controller/login')
app.use(login)

//route to signup  
const signup = require('./controller/signup')
app.use(signup)

//route  to refresh
const refresh = require('./controller/refresh_token')
app.use(refresh)


//route  to logout
const logout = require('./controller/logout')
app.use(logout)
