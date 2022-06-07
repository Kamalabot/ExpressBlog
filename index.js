const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const BlogPost = require('./models/BlogPost');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

mongoose.connect('mongodb+srv://bottingup:mhFSpF8aytE@cluster0.j5un5.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true})

app.use(express.static('public'));
app.set('view engine','ejs');
app.listen(3000, ()=>{
    console.log('Listening on 3000');
})

/*
app.get('/',(req, res) =>{
    res.json({
        name:'Local Love'
    })
})

app.get('/post/new',(req,res) =>{
    res.render('create');
})
*/

const newCreateController = require('./controllers/newPost');
app.get('/post/new',newCreateController);

app.post('/post/store',(req,res) =>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'public/img',image.name),async(error)=>{
        await BlogPost.create(req.body)
        res.redirect('/');
    })
})  

const newAboutController = require('./controllers/about');
app.get('/about',newAboutController);
/*
app.get('/about',(req, res) =>{
    //res.sendFile(path.resolve(__dirname,'pages/about.html'));
    res.render('about');
})
*/

const newContactController = require('./controllers/contact');
app.get('/contact', newContactController);
/*
app.get('/contact',(req, res) =>{
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'));
    res.render('contact');
})
*/
const newHomeController = require('./controllers/index');
app.get('/',newHomeController);
/*
app.get('/', async(req, res) =>{
    //res.sendFile(path.resolve(__dirname,'pages/index.html'));
    const blogposts = await BlogPost.find({});
    res.render('index',{
        blogposts
    });
})
//console.log(bloglist)
*/
const newPostController = require('./controllers/post');
app.get('/post',newPostController);
/*
app.get('/post',async(req, res) =>{
    //res.sendFile(path.resolve(__dirname,'pages/post.html'));
    //const blogpost = await BlogPost.findById(req.params.id);
    res.render('post');
})
*/