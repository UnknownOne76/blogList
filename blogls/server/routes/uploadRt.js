const exp = require('express'); 
const uploadRt = exp.Router(); 

uploadRt.post("/upload", async (req, res) => {
    if (!req.files) {
      res.send("No file");
    } 
    const file = req.files.file;
    const uploadDir = __dirname + "/uploads/" + file.name;
  
    file.mv(uploadDir, (err) => {
      console.log(err);
      if (err) res.status(400).send("Error");
  
      res.send({
        message: "Uploaded",
        fileUrl: file.name,
      });
    });
  });

  module.exports = uploadRt; 
