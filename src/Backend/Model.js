const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
  type: String
});

module.exports = mongoose.model("User", user);



// const itemSchema = ({
//     img: {
//         data: Buffer,
//         contentType: String
//     },
//     name: String,
//     category: String,
//     timed: Boolean,
//     from: String,
//     to: String,
//     status: String
// })

// const Item = new mongoose.model('Item', itemSchema);



