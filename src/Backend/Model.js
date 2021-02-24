const mongoose = require( 'mongoose');

const userSchema = ({
    email: String,
    password: String
});

const User = new mongoose.model('user', userSchema);



const itemSchema = ({
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



