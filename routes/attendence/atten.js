const express = require('express');
const router = express.Router();
const db = require('../../db');
const verifyUser = require("../../middleware/authentication");

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const resultsPerPage = 20;

router.get('/atten',verifyUser, function(req, res) {

    const sql = `select s.sid as id,s.name as name,count(*) as presentDays,((count(*)/90)*100)
     as percentage FROM users as s LEFT JOIN attendence as a ON s.sid = a.sid where attendence_status = 
    "P" and (s_date between '2023-12-01' and '2024-02-29') group by s.sid` ;
    db.query(sql,function (err, result, fields){
        if (err) throw err;
    
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
    
        let page = req.query.page ? Number(req.query.page) : 1;
        if(page > numberOfPages){
          res.redirect('/home/atten?page='+encodeURIComponent(numberOfPages));
        }else if(page < 1){
          res.redirect('/home/atten?page='+encodeURIComponent('1'));
        }
       
        const startingLimit = (page - 1) * resultsPerPage;
        
        if (req.query.month== "Dec 2023") {
            sql1 = `select s.sid as id,s.name as name,count(*) as presentDays,((count(*)/30)*100) as percentage FROM users as s LEFT JOIN attendence as a ON s.sid = a.sid where attendence_status = "P" and (s_date between '2023-12-01' and '2023-12-30') group by s.sid LIMIT ${resultsPerPage} offset ${startingLimit}`;
            db.query(sql1, (err, result)=>{
              if(err) throw err;
              let iterator = (page - 5) < 1 ? 1 : page - 5;
              let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
              if(endingLink < (page + 4)){
                  iterator -= (page + 4) - numberOfPages;
              }
              res.render('attendence/atten', {result, page, iterator, endingLink, numberOfPages,month:req.query.month});
        
          });
        }
        else if  (req.query.month== "Jan 2024" ) {
            sql1 = `select s.sid as id,s.name as name,count(*) as presentDays,((count(*)/31)*100) as percentage FROM users as s LEFT JOIN attendence as a ON s.sid = a.sid where attendence_status = "P" and (s_date between '2024-01-01' and '2024-01-31') group by s.sid LIMIT ${resultsPerPage} offset ${startingLimit}`;
            db.query(sql1, (err, result)=>{
              if(err) throw err;
              let iterator = (page - 5) < 1 ? 1 : page - 5;
              let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
              if(endingLink < (page + 4)){
                  iterator -= (page + 4) - numberOfPages;
              }
              res.render('attendence/atten', {result, page, iterator, endingLink, numberOfPages,month:req.query.month});
        
          });
        }

        else if(req.query.month== "Feb 2024" ){
            sql1 = `select s.sid as id,s.name as name,count(*) as presentDays,((count(*)/29)*100) as percentage FROM users as s LEFT JOIN attendence as a ON s.sid = a.sid where attendence_status = "P"  and (s_date between '2024-02-01' and '2024-02-29') group by s.sid LIMIT ${resultsPerPage} offset ${startingLimit}`;
            db.query(sql1, (err, result)=>{
              if(err) throw err;
              let iterator = (page - 5) < 1 ? 1 : page - 5;
              let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
              if(endingLink < (page + 4)){
                  iterator -= (page + 4) - numberOfPages;
              }
              res.render('attendence/atten', {result, page, iterator, endingLink, numberOfPages,month:req.query.month});
        
          });
        }

        else{
            sql1 = `select s.sid as id,s.name as name,count(*) as presentDays,((count(*)/90)*100) as percentage FROM users as s LEFT JOIN attendence as a ON s.sid = a.sid where attendence_status = "P"  and (s_date between '2023-12-01' and '2024-02-29') group by s.sid LIMIT ${resultsPerPage} offset ${startingLimit}`;
            db.query(sql1, (err, result)=>{
              if(err) throw err;
              let iterator = (page - 5) < 1 ? 1 : page - 5;
              let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
              if(endingLink < (page + 4)){
                  iterator -= (page + 4) - numberOfPages;
              }
              res.render('attendence/atten', {result, page, iterator, endingLink, numberOfPages,month:req.query.month});
        
          });
        }

 
         
      });


});

module.exports = router;