const bcrypt = require('bcrypt');
const User = require('../models/User');
const user = require('../models/User');

module.exports = (req,res)=>{
    const{username, password} = req.body;

    User.findOne({username:username},(error, user)=>{
        if(user){
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same){
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            })
        } else {
            res.redirect('/auth/login')
        }
    })
}

module.exports = (req, res) =>{
    newUser.create(req.body, (error, user)=>{
        if(error){
            return res.redirect('/auth/register')
        }
        res.redirect('/');
    })
}