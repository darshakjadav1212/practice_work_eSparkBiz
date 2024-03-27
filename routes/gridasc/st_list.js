const express = require('express');
const router = express.Router();
const db = require('../../db');

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const resultsPerPage = 40;

router.get('/gridasc', function(req, res) {
  var coln = req.query.col;
  var sort = req.query.order;
  console.log(coln);
  const sql = 'select * from people';

  db.query(sql,function (err, result, fields){
    if (err) throw err;

      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);

      let page = req.query.page ? Number(req.query.page) : 1;
      if(page > numberOfPages){
        res.redirect('/home/gridasc?page='+encodeURIComponent(numberOfPages));
      }else if(page < 1){
        res.redirect('/home/gridasc?page='+encodeURIComponent('1'));
      }
    
    const startingLimit = (page - 1) * resultsPerPage;

    if (!coln) {
      coln = "id"
    }

    if (!sort) {
      sort = "asc"
    }
    
      sql1 = `SELECT * FROM people order by ${coln} ${sort} LIMIT ${resultsPerPage} offset ${startingLimit}`;
      db.query(sql1, (err, result)=>{
        if(err) throw err;
        let iterator = (page - 5) < 1 ? 1 : page - 5;
        let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
        if(endingLink < (page + 4)){
            iterator -= (page + 4) - numberOfPages;
        }
        res.render('gridasc/st_list', {result, page, iterator, endingLink, numberOfPages,sort,coln});
  
    });
   
    
  });

});

module.exports = router;