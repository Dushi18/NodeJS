const db = require('../db/conn');
const express = require('express');
const path = require('path');
const User2 = require('../models/userModel');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const port = process.env.PORT;
const signToken = id=>{
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
}

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/signup',async (req,res)=>{
    try{
        const userData = new User2(req.body);
        await userData.save();
        const token = signToken(userData.id);
        console.log(token);
        // console.log(userData);
        res.status(201).send(`<h1> User saved successfully</h1> \n<a href= './'>Click here to go back...</a> `);
    } catch(err){
        res.status(400).send(err)
        console.log(err);;
    }
})
app.post('/login', async(req,res,next)=>{
    const {email, password} = req.body;
    console.log(req.body);
    console.log(`${email} ${password}`);

    if(!email || !password) {
        return next(new Error('Please provie an email and password'));
    }

    const user = await User2.findOne({email: email}).select('+password');
    // console.log(user);
    if(!user||!(await user.correctPassword(password, user.password))) {
        return next(new Error('Invalid EMAIL or PASSWORD'));
    };
    const token = signToken(user.id);
    res.status(200).send(`<b>Welcome! ${user.name} , email ${user.email}</b> \n <h1> You are successfully logged in</h1>\n <a href= './'>Click here to go back...</a> `);

});

app.listen(port, ()=>{
    console.log(`listening on port${port}`);
});