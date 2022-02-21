const express = require('express');
const router = express.Router();
const UserModel = require('../UserModel/model');


 
//get request to get all objects
router.get('/get', async(req, res) => {
    try{
        const userModel = await UserModel.find();
        res.json(userModel);
    }catch(err){
        res.send('Error' + err);
    }
})

//get-request to get object by id
router.get('/get/:id', async(req, res) => {
    try{
        const userModel = await UserModel.findById(req.params.id);
        res.json(userModel);
    }catch(err){
        res.send('Error' + err);
    }
})

//post-request to add an object
router.post('/add', async(req, res) =>{

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

//patch-request to update object by id
router.patch('/update/:id', async(req, res) => {
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

//delete-request to delete object by id
router.delete('/delete/:id', async(req, res) =>{
    try{
        const userModel = await UserModel.findById(req.params.id);
        userModel.delete();
        res.send('User deleted successfully!');
    }catch(err){
        res.send('Error' + err);
    }
    
})


router.post('/login', async (req, res) => {
    
    try{
        const login ={
            email : req.body.email,
            password : req.body.password
        }

        UserModel.findOne({email : login.email}, (error, data) =>{
            if(!data){
                return res.send('Email not found!');
            } else{
                if(data.password == login.password){
                    return res.send('Login SUceessful!');
                } else{
                    return res.send('Password Incorrect!');
                }
            }
        })
    }
    catch(err){
        res.send('Error' + err);
    }
});

router.patch('/forget-password', async(req, res) =>{
    try{
        const forgetUser = {
            email : req.body.email,
            password : req.body.password
        }
        UserModel.findOne( {email : forgetUser.email}, (error, data) =>{
            if(!data){
                return res.send('Email not found!')
            } else {
                if(data.email == forgetUser.email){
                    data.password = forgetUser.password
                    return res.send('Password Updated!');
                } else {
                    return res.send('Password did dot update');
                }
            }
        }); 
    }
    catch(err){
         res.send('Error' + err);
    }
});

module.exports = router;















