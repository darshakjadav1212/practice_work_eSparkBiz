const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended:false}));

router.get('/adduser', (req, res)=>{ 
    res.status(200); 
    const data = {
        title: 'Add User',
        heading: 'Add User',
     };
    res.render('adduser/home',data);
    
}); 

router.post('/get_details', (req, res)=>{ 
        var file_data = require('./student_data.json');
        var data = req.body;
        var sid = Math.floor(Math.random()*1000+1);
        
        if (Object.keys(data).length == 8) {
            data.id = sid;
            file_data.push(data)
            fs.appendFile('./student_data.json',JSON.stringify(file_data), function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
              
              res.render('adduser/get_details',{
                main_data : file_data
            });
        }
        else{
            res.send("Please Fill all the Details");
        }
      
}); 

router.get('/viewall/:id', (req, res)=>{
    try{
    var users = require('./student_data.json');
    let id  =req.params.id;
    let isValid = false;
    let data ;
   for (const user of users) {
    if (user.id == id) {
        isValid = true;
        data = user;
        break;
    }
   }
   if ((!isValid)) {
    res.json({"message" : "User Does Not Exist"}).send();
   }
    res.render('adduser/viewall',{data});}
    catch(err){
        console.log(err);
    }
   }); 

module.exports = router;