const mong = require('mongoose');
const { Schema , model } = mong; 
const user = new Schema({
    name: String,
    email: {
        type: String, 
        unique: true, 
        required: true 
    }, 
    password: {
        type: String,
        required: true
    },  
    img: String, 
    job: String,     
}); 

const User = model('Users' , user); 
module.exports = User; 