const express = require("express");
const router = express.Router();
const db = require("../../db");
const notifier = require("node-notifier");
const verifyUser = require("../../middleware/authentication");

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const resultsPerPage = 20;

router.get("/gridsearch",verifyUser, function (req, res) {
  res.render("gridsearch/form");
});

router.get("/search",verifyUser, (req, res) => {
  const searchTerm = req.query.sid;

  if (!searchTerm) {
    notifier.notify("Please Enter valid input 😡 😡 😡 😡...!");
    res.redirect("/home/gridsearch");
  } else {
    const query = "SELECT * FROM people WHERE id = ?";

    // Use '%' to perform a partial match
    const searchValue = `${searchTerm}`;

    db.query(query, [searchValue,searchValue], (err, result) => {
      if (err) throw err;

      if (result.length == 0) {
        notifier.notify("No Such Record Found 🥱 😴 🤤 😪...!");
        res.redirect("/home/gridsearch");
      } else {
        res.render("gridsearch/search", { result });
      }
    });
  }
});


router.get("/hide",verifyUser, (req, res) => {
  var coln = req.query.col;
  var sort = req.query.order;

  const searchTerm1 = req.query.fname;
  const searchTerm2 = req.query.lname;
  const searchTerm3 = req.query.check;

  const searchValue1 = `%${searchTerm1}%`;
  const searchValue2 = `%${searchTerm2}%`;

  const sql = `SELECT * FROM people WHERE fname LIKE ? ${searchTerm3} lname LIKE ? `;

  if (!searchTerm1 || !searchTerm2 || searchTerm3 == "") {
    notifier.notify("Please Enter valid input 😡 😡 😡 😡...!");
    res.redirect("/home/gridsearch");
  } else {
    db.query(sql,[searchValue1,searchValue2], function (err, result, fields) {
      if (err) throw err;

      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);

      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numberOfPages) {
        res.redirect("/home/hide?page=" + encodeURIComponent(numberOfPages));
      } else if (page < 1) {
        res.redirect("/home/hide?page=" + encodeURIComponent("1"));
      }

      const startingLimit = (page - 1) * resultsPerPage;

      if (!coln) {
        coln = "id";
      }

      if (!sort) {
        sort = "asc";
      }

      const query = `SELECT * FROM people WHERE fname LIKE ? ${searchTerm3} lname LIKE ?  order by ${coln} ${sort} limit ${startingLimit},${resultsPerPage}`;


      db.query(query,[searchValue1,searchValue2], (err, result) => {
        if (err) throw err;

        let iterator = page - 5 < 1 ? 1 : page - 5;
        let endingLink =
          iterator + 9 <= numberOfPages
            ? iterator + 9
            : page + (numberOfPages - page);
        if (endingLink < page + 4) {
          iterator -= page + 4 - numberOfPages;
        }

        if (result.length == 0) {
          notifier.notify("No Such Record Found 🥱 😴 🤤 😪...!");
          res.redirect("/home/gridsearch");
        } else {
          res.render("gridsearch/search1", { result, page, iterator, endingLink, numberOfPages,sort,coln,searchTerm1,searchTerm2,searchTerm3});
        }

        
      });
    });
  }
});

module.exports = router;
