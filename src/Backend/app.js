//jshint esversion:6
require('dotenv').config();
const express = require('express');
const passport = require('passport');
// const bodyParser = require('body-parser');
const session = require('express-session');
// const cookieParser = require('cookie-parser');

const passportLocalMongoose = require('passport-local-mongoose');
const cors = require('cors');
const mongoose = require('mongoose');

// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         db(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// const upload = multer({ storage: storage });


 
const app = express(); 
app.use(express.json());  
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
}));

app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: false,
}));
// app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("connetion established.");
});



const userSchema = new mongoose.Schema ({
    username: String,
    pass: String,
    type: String
});
// -----------------------------------------------------
userSchema.plugin(passportLocalMongoose);       //======> Adding plugin to schema...
// -----------------------------------------------------
const User = new mongoose.model('user', userSchema);

passport.use(User.createStrategy());            //===========>
                                                                    //copying from passport.js doc
passport.serializeUser(User.serializeUser());   //===========>
passport.deserializeUser(User.deserializeUser());      //====>




app.route("/register")
    .get((req, res)=>{
        console.log('get route log');
    })
    
    .post((req, res)=>{        
        User.register({username: req.body.username}, req.body.password, (err, user)=>{
        err ?
            console.log(err)
        :
            passport.authenticate("local")(req, res, ()=>
                res.send("user created.")
            ); 
        });
    });


app.route("/user")
    .get((req, res) => {
        // res.send(req);
        console.log(req.user);
    });






const itemSchema = new mongoose.Schema ({
    img: {
        data: Buffer,
        contentType: String
    },
    name: String,
    category: String,
    timed: Boolean,
    from: String,
    to: String,
    status: String
})

const Item = new mongoose.model('Item', itemSchema);




app.get('/',function(req, res){
    console.log("Welocome to home page");
})


// ------------------------------- Items route

app.route("/items") 

    .get((req, res)=>{
        Item.find({}, (err, data)=>{
            err ?
            console.log(err)
            :
            res.send(data);
    })})

    .post((req, res)=>{
        const {img,name,category,timed,from,to,status} = req.body;
        const oneItem = new Item({
            img: {
                // data: fs.readFileSync(path.join(__dirname + '/uploads/' + img)),
                data: img,
                contentType: 'image/png'
            },
            name: name,
            category: category,
            timed: timed,
            from: from,
            to: to,
            status: status
        });
        
        oneItem.save((err)=> 
            err ? 
            console.log(err) 
            : 
            console.log('inserted successfully'));
    })

    .put((req, res)=>{
        const {id, name, category, timed, status} = req.body;
        
        Item.findOneAndUpdate({_id: id }, {
            name: name,
            category: category,
            timed: timed,
            status: status
        }, (err)=>{
            !err ?            
            console.log('Successfully Updated '+ name)
            :
            console.log(err);
        }).then((doc)=>{
            res.send(doc);
        })
    })   

    .delete((req, res)=>{
        const {id} = req.body;
        Item.findByIdAndRemove( {_id: id} ).then((doc)=>{
            console.log(doc);
            res.send(doc)
        })
        
    });
              
       
// ----------------------------------- For Customer 

// 
    





app.listen(4000, function(){
    console.log("server started on port 4000.")
})