const express = require("express");
const router = express.Router();
const db = require("../../db");
const notifier = require("node-notifier");
var url = require('url');

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const resultsPerPage = 20;

router.get("/delim", function (req, res) {
  res.render("delim/form");
});

router.get("/delim1", (req, res) => {
  
    let searchTerm = req.query.sid;

    // const symbol = {
    //   '_' : "id",
    //   '^' : "fname",
    //   '$' : "fname",
    //   '}' : "fname",
    //   '{' : "fname",
    //   ':' : "fname",
    // }

    if (!searchTerm) {
      notifier.notify("Please Enter valid input 😡 😡 😡 😡...!");
      res.redirect("/home/delim");
    } else {

     let colName = [];
     for (let i = 0; i < searchTerm.length; i++) {

      if (searchTerm[i] == '_') {
        colName.push("id");
        searchTerm = searchTerm.replace('_', " ");
      }
      else if (searchTerm[i] == '^') {
        colName.push("fname");
        searchTerm = searchTerm.replace('^', " ");
      }
      
     else  if (searchTerm[i] == '$') {
        colName.push("lname");
        searchTerm = searchTerm.replace('$', " ");
      }
     else if (searchTerm[i] == '}') {
        colName.push("email");
        searchTerm = searchTerm.replace('}', " ");
      }
     else if (searchTerm[i] == '{') {
        colName.push("city");
        searchTerm = searchTerm.replace('{', " ");
      }
  
      else if(searchTerm[i] == ':'){
        colName.push("country");
        searchTerm = searchTerm.replace(':', " ");
      }
      
     }

     let valArra = searchTerm.split(" ");
     let valArray = valArra.filter(name => name.trim() !== '');
     

     var obj = {
      id : [''],
     };


     for (let index = 0; index < colName.length; index++) {
      if (colName[index] == "id" ) {
        obj.id[index] = valArray[index];
      }
      else{
        obj[colName[index]] =  valArray[index];
       
      }
     }


     console.log(colName.length);
     console.log(colName);
     console.log(valArray);
     console.log(obj);

      let query = `SELECT * FROM people WHERE ` ;
  
     for(let key in obj){

      if (key == "id") {
        query = query + "(";
        if (obj.id.length>1) {
          
          for (let index = 0; index < obj.id.length; index++) {
            if (index == obj.id.length-1) {
              query = query  + "( " + `${key}`+ " like " + `${obj.id[index]}` +")" +")" + " AND ";
            }
            else{
              query = query + "( "  + "( " + `${key}`+ " like " + `${obj.id[index]}` + ")" + " OR ";
            } 
          }
        }
        else{
          query = query  + "( " + `${key}`+ " like " + `${obj.id}`  +")" + " OR ";
        }
      }
      else{
            query = query  + "( " + `${key}`+ " like " + `'%${obj[key]}%'` + ")" + ")" ;
        }

      }
       



        // else{
        //   if (check_is_one == 1) {
        //     check_is_one = 2
        //     query = query + `${key}` + " like " + `%${obj[key][index]}%`
        //   }
        //   else{
        //     query = query + " AND " + `${key}` + " like " + `%${obj[key][index]}%`
        //   }
        // }

      
        console.log(query);
  
      db.query(query, (err, result) => {  
        // console.log(result);
        if (result) {
          
          res.render("delim/delim", { result });
        
        } else {
         
          notifier.notify("No Such Record Found 🥱 😴 🤤 😪...!");
          res.redirect("/home/delim");
        }
      });
    }
  });
  

module.exports = router;
