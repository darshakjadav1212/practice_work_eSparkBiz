const fs = require('fs');

const getAddUserController = (req,res) =>{
    res.status(200); 
    const data = {
        title: 'Add User',
        heading: 'Add User',
     };
    res.render('adduser/home',data);
}

const postGetDetailsController = (req,res) =>{
    var file_data = require('../../data/student_data.json');
        var data = req.body;
        var sid = Math.floor(Math.random()*1000+1);
        
        if (Object.keys(data).length == 8) {
            data.id = sid;
            file_data.push(data)
            fs.writeFile('./data/student_data.json',JSON.stringify(file_data), function (err) {
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
}

const  getViewDetailsController = (req,res) =>{
    try{
        var users = require('../../data/student_data.json');
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
}

module.exports = {getAddUserController,postGetDetailsController,getViewDetailsController};