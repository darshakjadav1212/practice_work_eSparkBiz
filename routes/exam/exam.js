const express = require('express');
const router = express.Router();
const db = require('../../db');
const verifyUser = require("../../middleware/authentication");

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const resultsPerPage = 20;

router.get('/exam',verifyUser, function(req, res) {

    const sql = "select s.sid as id,s.name as name,a.ob_th as ob_th,a.ob_pr as ob_pr FROM users as s LEFT JOIN exam as a ON s.sid = a.sid where a.exam_type = 1 "; 
    db.query(sql,function (err, result, fields){
        if (err) throw err;
    
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
    
        let page = req.query.page ? Number(req.query.page) : 1;
        if(page > numberOfPages){
          res.redirect('/home/exam?page='+encodeURIComponent(numberOfPages));
        }else if(page < 1){
          res.redirect('/home/exam?page='+encodeURIComponent('1'));
        }
       
        const startingLimit = (page - 1) * resultsPerPage;
 
        db.query(`select s.sid as id,s.name as name,a.ob_th as ob_th,a.ob_pr as ob_pr FROM users as s LEFT JOIN exam as a ON s.sid = a.sid where a.exam_type = 1  LIMIT ${resultsPerPage} offset ${startingLimit} ; select s.sid as id,s.name as name,a.ob_th as ob_th,a.ob_pr as ob_pr FROM users as s LEFT JOIN exam as a ON s.sid = a.sid where a.exam_type = 2  LIMIT ${resultsPerPage} offset ${startingLimit} ;select s.sid as id,s.name as name,a.ob_th as ob_th,a.ob_pr as ob_pr FROM users as s LEFT JOIN exam as a ON s.sid = a.sid where a.exam_type = 3  LIMIT ${resultsPerPage} offset ${startingLimit}`, (err, result)=>{
          if(err) throw err;
          let iterator = (page - 5) < 1 ? 1 : page - 5;
          let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
          if(endingLink < (page + 4)){
              iterator -= (page + 4) - numberOfPages;
          }
          var res1 = result[0];
          var res2 = result[1];
          var res3 = result[2];
          res.render('exam/exam', { id:result[0].id,res1,res2,res3,page, iterator, endingLink, numberOfPages});
    
      });


      });

});


router.get('/result',verifyUser, function(req, res) {

        var id = req.query.id;
 
        db.query(`select  s.name,a.ob_th ,a.ob_pr, (SUM(a.ob_th) OVER()+SUM(a.ob_pr) OVER())/3 as average,
        ((((SUM(a.ob_th) OVER()+SUM(a.ob_pr) OVER())  /3 )/100 )*100) as percentage
       FROM 
       users as s LEFT JOIN exam as a ON s.sid = a.sid 
       where s.sid = ${id} and (a.exam_type = 1 or a.exam_type= 2 or a.exam_type= 3);`, (err, result)=>{
        if(err) throw err;
        
        console.log(result);
          res.render('exam/report',{result});
    
      });


});



module.exports = router;