//jshint esversion:6
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const cors = require('cors');

// ----------Reuire end

 
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))  ;
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(session({
        secret: 'secret-code',
        resave: false,
        saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// ---------middlewares end 


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("connetion established.");
});
// -------connection


const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        unique: true,
        dropDups: true
    },
    username: {
        type: String,
        unique: true,
        dropDups: true
    },
    password: String,
    userType: String
});

// -----------------------------------------------------
userSchema.plugin(passportLocalMongoose);       //======> Adding plugin to schema...
// -----------------------------------------------------
const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());            //===========>
                                                                    //copying from passport.js doc
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());      //====>







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
    


app.get("/register",(req, res)=>{
    console.log('get route log');
});

app.post("/register",(req, res)=>{ 

    User.register({ username: req.body.username, email:req.body.email, userType: req.body.userType }, req.body.password, (err, user)=>{
    err ?
        res.send(err.message)
    :
        passport.authenticate('local')(req, res, ()=>{(res.send("User Created."))})
    });
});


app.get("/user", (req, res)=>{
    const {_id, email, username} = req.user;
    res.send({
        id: _id,
        email: email,
        name: username,
    });
});





app.listen(4000, function(){
    console.log("server started on port 4000.")
})

