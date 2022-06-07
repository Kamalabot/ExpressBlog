const newUser = require('../models/User');
const path = require('path');

module.exports = (req, res) =>{
    newUser.create(req.body, (error, user)=>{
        if(error){
            return res.redirect('/auth/register')
        }
        res.redirect('/');
    })
}