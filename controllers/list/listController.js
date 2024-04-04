const db = require('../../db');

const resultsPerPage = 40;

const getListController =(req,res) =>{
    const sql = 'select * from students';

  db.query(sql,function (err, result, fields){
    if (err) throw err;

    const numOfResults = result.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);

      let page = req.query.page ? Number(req.query.page) : 1;
      if(page > numberOfPages){
        res.redirect('/home/list?page='+encodeURIComponent(numberOfPages));
      }else if(page < 1){
        res.redirect('/home/list?page='+encodeURIComponent('1'));
      }
   
    const startingLimit = (page - 1) * resultsPerPage;


    if (req.query.order == "ASC") {
      sql1 = `SELECT * FROM students order by fname asc LIMIT ${resultsPerPage} offset ${startingLimit}`;
      db.query(sql1, (err, result)=>{
        if(err) throw err;
        let iterator = (page - 5) < 1 ? 1 : page - 5;
        let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
        if(endingLink < (page + 4)){
            iterator -= (page + 4) - numberOfPages;
        }
        res.render('list/list', {result, page, iterator, endingLink, numberOfPages,order:req.query.order});
  
    });
      
    }
    else if (req.query.order == "DESC") {
      sql1 = `SELECT * FROM students  order by fname desc LIMIT ${resultsPerPage} offset ${startingLimit}`;
      db.query(sql1, (err, result)=>{
        if(err) throw err;
        let iterator = (page - 5) < 1 ? 1 : page - 5;
        let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
        if(endingLink < (page + 4)){
            iterator -= (page + 4) - numberOfPages;
        }
        res.render('list/list', {result, page, iterator, endingLink, numberOfPages,order:req.query.order});
  
    });
    }

   else{
    sql1 = `SELECT * FROM students LIMIT ${resultsPerPage} offset ${startingLimit}`;
      db.query(sql1, (err, result)=>{
        if(err) throw err;
        let iterator = (page - 5) < 1 ? 1 : page - 5;
        let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
        if(endingLink < (page + 4)){
            iterator -= (page + 4) - numberOfPages;
        }
        res.render('list/list', {result, page, iterator, endingLink, numberOfPages,order:req.query.order});
  
    });
   }
     
  });
}

module.exports = {getListController}