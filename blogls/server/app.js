const exp = require('express') , mong = require('mongoose'); 
const app = exp() , port = 3030 , url = 'mongodb://localhost:27017/blogPosts'; 
const blogPosts = require('./models/blog'); 

app.use(exp.json());

mong.connect(url).then(() => {
    console.log('Connected Successfully.'); 
    
    app.get('/lists' , async (req , res) => {
        const datas = await blogPosts.find(); 
        res.send({
            data: datas,
        })
    }); 

    app.post('/post' , (req , res) => {
        blogPosts.insertMany(req.body).then(() => console.log('success.'));
        res.send('Posted.');   
    }); 

    app.listen(port , () => {
        console.log(`Started on localhost:${port}`); 
    });
}); 
