const exp = require('express'); 
const blogPosts = require('../models/blog');
const postRt = exp.Router(); 

postRt.get("/posts", async (req, res) => {
    const pageNumber = req.query.page || 1 , perPage = req.query.perPage !== '0' ? req.query.perPage : 3 , offset = (pageNumber - 1) * perPage;
    const totalPage = await blogPosts.find({}).count() , pages = Math.ceil(totalPage / perPage); 
    if (req.body) { 
      const posts = await blogPosts.find({}).sort({_id: -1}).populate("author").skip(offset).limit(perPage);
      res.send({
         data: posts,
         pageNumber, 
         perPage,
         pages, 
      });
    }
    else {
       res.send('data not found.');
       return 0;  
    }
  })

 postRt.put("/posts" , async (req , res) => {
    const { page } = req.body;  
    res.send({
       pageNumber: page
    })
});  


postRt.get('/spec/:id' , async (req , res) => {
   const data = await blogPosts.findOne({_id: req.params['id']}).populate("author");  
   if ( data ) {
     res.send(data); 
   } 
   else {
      res.send('Not found.'); 
      return 0; 
   }
})

postRt.post('/addComment/:id' , (req , res) => {
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

postRt.post("/post", async (req, res) => {
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

module.exports = postRt; 