//it is just for reference ,main file is server.js

const express = require('express');
const mongoose = require('mongoose');
const DBschema = require('./model')

const app = express()

mongoose.connect('mongodb+srv://tharunkarnekota:tharunkarnekota@cluster0.k5uht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    ()=>{
    console.log('DB is connected..')
    }
)

app.use(express.json());

app.post('/register',async (req,res)=>{
    try{
        const {username,email,password,confirmpassword} = req.body;
        let exist = await DBschema.findOne({email})
        if(exist){
            return res.status(400).send('User Already Exist')
        }
        if(password !== confirmpassword){
            return res.status(400).send('passwords are not matching')
        }
        let newUser = new DBschema({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        return res.status(200).send('register succesfully')
      //return res.json(await DBschema.find())
      //res.status(200).json(await DBschema.find())      //both commets are same
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internal Server Error');
    }
})

app.listen(5000,()=>{
    console.log('server is running..')
})