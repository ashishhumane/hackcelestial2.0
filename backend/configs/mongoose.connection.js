const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`db connected successfully`);
    })
    .catch((error) => {
        console.log(error.message);    
    }) 

module.exports = mongoose.connection;