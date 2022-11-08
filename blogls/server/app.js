const exp = require('express') , mong = require('mongoose') , cors = require('cors'); 
const app = exp() , url = 'mongodb+srv://uk_76:uk_76@firstdatabase.asyfgny.mongodb.net/?retryWrites=true&w=majority'; 
const postRt = require('./routes/postRouter');
const userRt = require('./routes/userData');
const uploadRt = require('./routes/uploadRt');
const fileUpload = require("express-fileupload");
const path = require("path");
app.use(exp.json());
app.use(cors()); 
app.use(postRt , userRt , uploadRt);  
app.use("/uploads/", exp.static(path.join(__dirname, "uploads")));
app.use(fileUpload());

mong.connect(url).then(() => {
    console.log('Connected Successfully.'); 
}); 

module.exports = app; 
