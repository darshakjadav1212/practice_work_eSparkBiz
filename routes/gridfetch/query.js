const express = require('express');
const router = express.Router();
const db = require('../../db');

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



router.get('/gridfetch', function(req, res) {
  res.render('gridfetch/query');
});

const resultsPerPage = 20;

router.all('/data', function(req, res) {
    let sql

    if (req.body.query_fetch) {
        sql = req.body.query_fetch;
    }
    if (req.query.query_fetch) {
        sql = req.query.query_fetch;
    }

    db.query(sql,function (err, result, fields){
        if (err) {
            return res.end("Please Enter Appropriate Query")
        }

    const numOfResults = result.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);

    let page = req.query.page ? Number(req.query.page) : 1;
    if(page > numberOfPages){
      res.redirect('/home/data?page='+encodeURIComponent(numberOfPages));
    }else if(page < 1){
      res.redirect('/home/data?page='+encodeURIComponent('1'));
    }

    const startingLimit = (page - 1) * resultsPerPage;

    var sql1 = `${sql} LIMIT ${resultsPerPage} offset ${startingLimit}`
      console.log(sql1);
      db.query(sql1, (err, result)=>{
        if(err) throw err;
        let iterator = (page - 5) < 1 ? 1 : page - 5;
        let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
        if(endingLink < (page + 4)){
            iterator -= (page + 4) - numberOfPages;
        }

        res.render('gridfetch/query', {result, page, iterator, endingLink, numberOfPages,sql1:sql});
  
    });


      });

});


module.exports = router;