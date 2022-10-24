const mong = require('mongoose'); 
const Schema = mong.Schema;

const ls = new Schema({
     blogImg: {
      type: String,
      maxLength: 255,
      required: true, 
     },  
     title:{
       type: String, 
       maxLength: 100, 
       required: true, 
     },  
     descrip: {
      type: String,
      maxLength: 3000, 
      required: true
     },  
     txt: {
      type: String,
      maxLength: 2000, 
      required: true
     }, 
     author: {
         type: Schema.ObjectId, 
         ref: "Users", 
         required: true, 
     }, 
     comments: [
        {
          img: String,
          name: {
            type: String, 
            required: true
         }, 
          txt: {
            type: String, 
            required: true
         }, 
        }
     ], 
     publishedAt: {
        type: Date, 
        required: true
     }
}); 

const blogs = mong.model('blogs' , ls); 
module.exports = blogs; 