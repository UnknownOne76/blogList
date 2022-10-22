const mong = require('mongoose'); 
const Schema = mong.Schema;

const ls = new Schema({
     blogImg: String, 
     title: String, 
     descrip: String, 
     txt: String,
     author: {
        img: String, 
        name: String, 
        job: String,
     }, 
     comments: [
        {
          img: String, 
          name: String, 
          txt: String, 
        }
     ], 
     publishedAt: String
}); 

const blogs = mong.model('blogs' , ls); 
module.exports = blogs; 