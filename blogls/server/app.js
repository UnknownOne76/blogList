const exp = require('express') , mong = require('mongoose') , cors = require('cors'); 
const app = exp() , port = 3030 , url = 'mongodb://localhost:27017/blogPosts'; 
const blogPosts = require('./models/blog');
const User = require('./models/users');
const jwt = require('jsonwebtoken');   

app.use(exp.json());
app.use(cors()); 

const JWT_SECRET = "LtscoEMqX3iYSBP8LR10MHxKGcyIT4pxYgT1TBx2PUx9VM33tBgrwvB0cdmEep4owqNL5JWwdmUobWvIj69eX5kDCtNKkiHTxh31EGcvuMxr1P"; 



mong.connect(url).then(() => {
    console.log('Connected Successfully.'); 

    app.get("/", async (req, res) => {
        const users = await User.find().lean();
        res.send({
          data: users,
        });
      });

      app.get("/lists", async (req, res) => {
        if ( req.body ) { 
          const posts = await blogPosts.find().populate("author");
          res.send(posts);
        }
        else {
           res.send('reading data.'); 
        }
      })

    app.get('/spec/:id' , async (req , res) => {
         if ( req.params['id'].length >= 10) {
           const data = await blogPosts.findOne({_id: req.params['id']}).populate("author");  
           res.send(data); 
         }
         else {
           return 0;
         }
    })

    app.post("/users", async (req, res) => {
        const { name, email , password , img, job } = req.body;
        const oldUser = await User.findOne({email: email});
        if ( oldUser ) {
           res.send('User was here before.'); 
        } 
        else {
          await User.create({
            name: name,
            email: email,
            password: password, 
            img: img,
            job: job,
          });
          res.send({
            message: "User has been created.",
          });
        }; 
      });

      app.post('/login' , async (req , res) => {
           const { email , password } = req.body; 
           const user = await User.findOne({email: email}); 
           if (user) {
              const token = jwt.sign({email: user.email} , JWT_SECRET);
              if (password === user.password) {  
                res.send({
                  msg: 'Logged in!', 
                  token: token
                })
              }
              else {
                console.log(password , user.password); 
                return res.send('Incorrect password.');
              }
          }
          else {
             res.send('User not found.'); 
             return 0; 
          }
        }); 

      app.post('/userDet' , (req , res) => {
          const { token } = req.body; 
          try {
            const user = jwt.verify(token , JWT_SECRET);  
            User.findOne({email: user.email}).then((data) => {
               res.send(data); 
            })
          } catch(err) {
             console.log(err); 
          }
      })

      app.post('/addComment/:id' , (req , res) => {
         const { img , name , txt } = req.body;  
         blogPosts.updateOne({_id: req.params['id']} ,{$push: {comments: {
            img: img, 
            name: name, 
            txt: txt
      }}}).then((res) => {
          console.log(res); 
      }).catch((err) => console.log(err));  
         res.send('Successfully sent.')
      })

    app.post("/post", async (req, res) => {
        const { title, descrip, txt , blogImg, userId , comments , publishedAt } = req.body;
        try {
          await blogPosts.create({
            title: title,
            descrip: descrip,
            txt: txt,
            blogImg: blogImg,
            author: userId,
            comments: comments, 
            publishedAt: publishedAt
          });
          res.send({
            message: "Post added",
          });
        } catch (e) {
          res.send({
            error: e,
          });
        }
      });


    app.listen(port , () => {
        console.log(`Started on localhost:${port}`); 
    });
}); 
