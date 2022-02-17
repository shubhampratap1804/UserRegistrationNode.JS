const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const UserModel = require('../routers/model/registration');


router.get('/', async(req, res) => {
    try{
        const userModel = await UserModel.find();
        res.json(userModel);
    }catch(err){
        res.send('Error' + err);
    }
})

router.post('/', async(req, res) =>{

    const userModel = new UserModel ({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password: req.body.password
    })

    try{
        const user = await userModel.save();
        res.json(user);
    }catch(err){
        res.send('Error' + err);
    }
})

router.get('/:id', async(req, res) => {
    try{
        const userModel = await UserModel.findById(req.params.id);
        res.json(userModel);
    }catch(err){
        res.send('Error' + err);
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const userModel = await UserModel.findById(req.params.id);
        userModel.firstName = req.body.firstName;
        userModel.lastName = req.body.lastName;
        userModel.email = req.body.email;
        userModel.password = req.body.password;
        const user = await userModel.save();
        res.json(user);
    }catch(err){
        res.send('Error' + err);
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        const userModel = await UserModel.findById(req.params.id);
        userModel.delete();
        res.send('User deleted successfully!');
    }catch(err){
        res.send('Error' + err);
    }
    
})


module.exports = router;
