const exp = require('express') , mong = require('mongoose') , cors = require('cors'); 
const app = exp() , port = 3030 , url = 'mongodb://localhost:27017/blogPosts'; 
const postRt = require('./routes/postRouter');
const userRt = require('./routes/userData');

app.use(exp.json());
app.use(cors()); 
app.use(postRt , userRt);  

mong.connect(url).then(() => {
    console.log('Connected Successfully.'); 

    app.listen(port , () => {
        console.log(`Started on localhost:${port}`); 
    });
}); 
