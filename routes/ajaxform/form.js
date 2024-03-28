const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../db');
const notifier = require('node-notifier');
var bodyParser = require('body-parser');

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/ajaxform', function(req, res, next) {
  res.render('ajaxform/form'); // Assuming you have a template engine for rendering
});

router.post('/basic_details', function(req, res, next) {
  let str = req.body;

  const{first_name,last_name,deg1,address_1,address_2,email,phone_number,
    city,state,relationship,zip_code,date_of_birth,gender,uid} =req.body;
    var sql,select;
    if (uid == undefined) {
       sql = `INSERT INTO 
      employee_details(first_name,last_name,deg1,email,phone_no,address1,address2
      ,gender,relationship_status,date_of_birth,city,state,zip_code)
      values(?,?,?,?,?,?,?,?,?,?,?,?,?)`; 

      db.query(sql,[first_name,last_name,deg1,email,phone_number,address_1,address_2,
        gender,relationship,date_of_birth,city,state,zip_code], function(err, result) {
          if (err) throw err;
          let pid = result.insertId;
          res.json({id:pid});
          console.log("Basic Details is inserted successfully");
        });
    }
   else{
     sql =  `UPDATE employee_details
    SET first_name = ?, last_name = ?,deg1 = ?,email = ?,phone_no = ?,
    address1 = ?,address2 = ?,gender = ?,relationship_status = ?,date_of_birth = ?,city = ?,state = ?,zip_code =?
   WHERE e_id = ${uid}`;
   select = `select e_id from employee_details where e_id =${uid}`;

   db.query(`${select};${sql}`,[first_name,last_name,deg1,email,phone_number,address_1,address_2,
    gender,relationship,date_of_birth,city,state,zip_code], function(err, result) {
      if (err) throw err;
      let pid = result[0][0].e_id;
      console.log(result[0][0].e_id);
      res.json({id:pid});
      console.log("Basic Details is inserted successfully");
    });
   }

});

router.post('/education_details', function(req, res, next) {

  let str = req.body;
  
  console.log(str);

  const{ssc_name,ssc_passing_year,ssc_percentage,hsc_name,
    hsc_passing_year,hsc_percentage,b_course_name,b_university,
    b_passing_year,b_percentage,m_course_name,m_university,
    m_passing_year,m_percentage,id,sid,cid} =req.body;

  var sql1,sql2,select1,select2;
    
if (sid == undefined && cid == undefined) {
   sql1 = `INSERT INTO 
    employee_school(ssc_name,ssc_passing_year,ssc_percentage,hsc_name,hsc_passing_year,hsc_percentage,emp_id)
    values(?,?,?,?,?,?,?)`;

     sql2 = `INSERT INTO 
    employee_college(b_course_name,b_university
      ,b_passing_year,b_percentage,m_course_name,m_university
      ,m_passing_year,m_percentage,e_id)
    values(?,?,?,?,?,?,?,?,?)`;

    db.query(`${sql1};${sql2}`,[ssc_name,ssc_passing_year,ssc_percentage,
      hsc_name,hsc_passing_year,hsc_percentage,id,b_course_name,b_university,b_passing_year
      ,b_percentage,m_course_name ,m_university,m_passing_year,m_percentage,id], function(err, result) {
        if (err) throw err;
        var sid = result[0].insertId;
        var cid = result[1].insertId;
        res.json({sid:sid,cid:cid});
        console.log("Education Details is inserted successfully");
      });
}
else{
   sql1 =  `UPDATE employee_school
  SET ssc_name = ?, ssc_passing_year = ?,ssc_percentage = ?,hsc_name = ?,hsc_passing_year = ?,
  hsc_percentage = ? WHERE emp_id = ${id}`;
   sql2 = `UPDATE employee_college
  SET b_course_name = ?, b_university = ?,b_passing_year = ?,b_percentage = ?,m_course_name = ?,
  m_university = ?, m_passing_year = ?, m_percentage = ? WHERE e_id = ${id}`;
  select1 = `select school_id from employee_school where school_id = ${sid}`;
  select2 =`select college_id from employee_college where college_id = ${cid}`;

  db.query(`${select1};${select2};${sql1};${sql2}`,[ssc_name,ssc_passing_year,ssc_percentage,
    hsc_name,hsc_passing_year,hsc_percentage,id,b_course_name,b_university,b_passing_year
    ,b_percentage,m_course_name ,m_university,m_passing_year,m_percentage,id], function(err, result) {
      if (err) throw err;
      var sid = result[0][0].school_id;
      var cid = result[1][0].college_id;
      res.json({sid:sid,cid:cid});
      console.log("Education Details is inserted successfully");
    });
}
    

});

router.post('/work_experience', function(req, res, next) {

  let str = req.body;
  
  console.log(str);
  var sql;
  const{company_name,deg2,from,to,id,wid} =req.body;

  if (wid == undefined) {
   sql = `INSERT INTO 
    work_experience(company_name,deg2
      ,from_date,to_date,e_id)
    values(?,?,?,?,?)`;

if (company_name != "" || company_name != null) {
  db.query(sql,[company_name,deg2,from,to,id], function(err, result) {
    if (err) throw err;
    var wid = result.insertId;
    console.log(result.insertId);
    res.json({wid:wid});
    
    console.log("Work Experience Details is inserted successfully");
  });
}
  }
  else{
     sql = `UPDATE work_experience
    SET company_name = '${company_name}', deg2 = '${deg2}',from_date = '${from}',to_date = '${to}'
     WHERE e_id = ${id}`;
      select = `select e_work_experience_id from work_experience where e_work_experience_id=${wid}`;  
        db.query(`${select};${sql}`, function(err, result) {
          var wid = result[0][0].e_work_experience_id;
        console.log(result[0][0].e_work_experience_id);
          res.json({wid:wid});
          console.log("Work Experience is inserted successfully");
        });
  }
   
  
    
});

router.post('/language', function(req, res, next) {

  let str = req.body;
  
  console.log(str);

  const{hindi,hindiread,hindiwrite,hindispeak,english,
    englishread,englishwrite,englishspeak,gujrati,gujratiread,gujratiwrite,gujratispeak
    ,id,lid1,lid2,lid3} =req.body;


  if (lid1 == undefined || lid2 == undefined || lid3 == undefined ) {
    const sql_lang_1 = `INSERT INTO 
    language(lan1,redo
    ,wedo,sedo,e_id)
    values('${hindi}','${hindiread}','${hindiwrite}','${hindispeak}','${id}')`;

    const sql_lang_2 = `INSERT INTO 
    language(lan1,redo
  ,wedo,sedo  ,e_id)
  values('${english}','${englishread}','${englishwrite}','${englishspeak}','${id}')`;

  const sql_lang_3 = `INSERT INTO 
    language(lan1,redo
   ,wedo,sedo  ,e_id)
    values('${gujrati}','${gujratiread}','${gujratiwrite}','${gujratispeak}','${id}')`;
    
      if (hindi != "" || hindi != null || english != "" || english != null 
      || gujrati != "" || gujrati != null) {

    db.query(`${sql_lang_1};${sql_lang_2};${sql_lang_3}`, function(err, result) {
      if (err) throw err;

      var lid1  = result[0].insertId;
      var lid2  = result[1].insertId;
      var lid3  = result[2].insertId;
      console.log(lid1,lid2,lid3);
      res.json({lid1:lid1,lid2:lid2,lid3:lid3});

      console.log("Language is inserted successfully");
    });
    
      }
  }
  else{
    if (hindi != '' || english != '' || gujrati != '') {
      let sqlwo1 = `select language_id from language where e_id=${id} and lan1='${hindi}'`;
      let sqlwo2 = `select language_id from language where e_id=${id} and lan1='${english}'`;
      let sqlwo3 = `select language_id from language where e_id=${id} and lan1='${gujrati}'`;

      db.query(`${sqlwo1};${sqlwo2};${sqlwo3}`, function(err, result) {
          if (err) err.message; 
    
          let work_id1 = result[0][0].language_id;
          let work_id2 = result[1][0].language_id;
          let work_id3 = result[2][0].language_id;
          // console.log(result[0][0].language_id, result[1][0].language_id,result[2][0].language_id);
        
          let sqlw1 = `UPDATE language
          SET lan1 = '${hindi}', redo = '${hindiread}',wedo = '${hindiwrite}',sedo = '${hindispeak}'
           WHERE e_id = ${id} and language_id =${work_id1} `;

           let sqlw2 = `UPDATE language
          SET lan1 = '${english}', redo = '${englishread}',wedo = '${englishwrite}',sedo = '${englishspeak}'
           WHERE e_id = ${id} and language_id =${work_id2} `;
        

           let sqlw3 = `UPDATE language
           SET lan1 = '${gujrati}', redo = '${gujratiread}',wedo = '${gujratiwrite}',sedo = '${englishspeak}'
            WHERE e_id = ${id} and language_id =${work_id3} `;

          db.query(`${sqlw1};${sqlw2};${sqlw3}`, function(err, result) {
            console.log(work_id1,work_id2,work_id3);
            res.json({lid1:work_id1,lid2:work_id2,lid3:work_id3})
            console.log("User 5 is inserted successfully");
          });
    
       });  
    }
  }
    
});

router.post('/technology', function(req, res, next) {

  let str = req.body;
  
  console.log(str);

  const{php,phplevel,mysql,mysqllevel,laravel,laravellevel,oracle,oraclelevel,id,tid1,tid2,tid3,tid4} =req.body;

  if (tid1 == undefined || tid2 == undefined || tid3 == undefined || tid4 == undefined) {
const sql_tech_1 = `INSERT INTO 
technology(language,level,e_id)
values('${php}','${phplevel}','${id}')`;

const sql_tech_2 = `INSERT INTO 
technology(language,level,e_id)
values('${mysql}','${mysqllevel}','${id}')`;

const sql_tech_3 = `INSERT INTO 
technology(language,level,e_id)
values('${laravel}','${laravellevel}','${id}')`;

const sql_tech_4 = `INSERT INTO 
technology(language,level,e_id)
values('${oracle}','${oraclelevel}','${id}')`;

const select = `select tech_id from technology where e_id = ${id}`;


if (php != ""  || mysql != ""|| laravel != ""||  oracle != "") {
   
  
  db.query(`${sql_tech_1};${sql_tech_2};${sql_tech_3};${sql_tech_4};${select}`, function(err, result) {
    if (err) throw err;
   
        console.log(result[4][0].tech_id);
        var tid1,tid2,tid3,tid4;
        tid1 = result[4][0].tech_id;
        tid2 = result[4][1].tech_id;
        tid3 = result[4][2].tech_id;
        tid4 = result[4][3].tech_id;
    res.json({tid1:tid1,tid2:tid2,tid3:tid3,tid4});
    console.log("Technology is inserted successfully");
 
  
  });
}
  }
  else{
    if (php != '' || mysql != "" || laravel != "" ||  oracle != "") {
      let sqlwo1 = `select tech_id from technology where e_id=${id} and language='${php}'`;
      let sqlwo2 = `select tech_id from technology where e_id=${id} and language='${mysql}'`;
      let sqlwo3 = `select tech_id from technology where e_id=${id} and language='${oracle}'`;
      let sqlwo4 = `select tech_id from technology where e_id=${id} and language='${laravel}'`;


      db.query(`${sqlwo1};${sqlwo2};${sqlwo3};${sqlwo4};`, function(err, result) {
          if (err) err.message; 
    
          let work_id1 = result[0][0].tech_id;
          let work_id2 = result[1][0].tech_id;
          let work_id3 = result[2][0].tech_id;
          let work_id4 = result[3][0].tech_id;
          console.log(work_id1,work_id2,work_id3,work_id4);
          let sqlw1 = `UPDATE technology
          SET language = '${php}', level = '${phplevel}' WHERE e_id = ${id} and tech_id =${work_id1} `;

          let sqlw2 = `UPDATE technology
          SET language = '${mysql}', level = '${mysqllevel}' WHERE e_id = ${id} and tech_id =${work_id2} `;
    
          let sqlw3 = `UPDATE technology
          SET language = '${oracle}', level = '${oraclelevel}' WHERE e_id = ${id} and tech_id =${work_id3} `;

          let sqlw4 = `UPDATE technology
          SET language = '${laravel}', level = '${laravellevel}' WHERE e_id = ${id} and tech_id =${work_id4} `;

    
          db.query(`${sqlw1};${sqlw2};${sqlw3};${sqlw4};`, function(err, result) {
            if (err) err.message; 
            res.json({tid1:work_id1,tid2:work_id2,tid3:work_id3,tid4:work_id4})
            console.log("Technology is inserted successfully");
          });
    
    });  
    }
  }

    
});

router.post('/references', function(req, res, next) {

  let str = req.body;
  
  console.log(str);

  const{ref_name,ref_contact_no,relation,id,rid} =req.body;

  if (rid == undefined) {
    const sql6 = `INSERT INTO 
    ref_contact(ref_name,ref_contact_no
      ,relation,e_id)
    values(?,?,?,?)`;
     
        if (ref_name != "" ) {
          db.query(sql6,[ref_name,ref_contact_no
            ,relation,id], function(err, result) {
              if (err) err.message; 
              var rid = result.insertId;
              res.json({rid:rid})
              console.log("Reference is inserted successfully");
        });  
        }
  }
  else{
    if (ref_name != '') {
      let sqlwo = `select ref_contact_id from ref_contact where e_id=${id}`;
    
      db.query(`${sqlwo}`, function(err, result) {
          if (err) err.message; 
    
          let work_id1 = result[0].ref_contact_id;
          
    
          let sqlw1 = `UPDATE ref_contact 
      SET ref_name = '${ref_name}', ref_contact_no = '${ref_contact_no}',relation = '${relation}'
       WHERE e_id = ${id} and ref_contact_id = ${work_id1}`;
       
          db.query(`${sqlw1}`, function(err, result) {
            res.json({rid:work_id1});
            console.log("References is inserted successfully");
          });
          
    });  
    }
  }
 
    
});

router.post('/preferences', function(req, res, next) {

  const{preference_location,notice_period,current_ctc,exp_ctc,department,id,prid} =req.body;

  if (prid == undefined) {

    const sql7 = `INSERT INTO 
    preferences(preference_location,notice_period
          ,expected_ctc,current_ctc,department,e_id)
        values(?,?,?,?,?,?)`;
        
      if (preference_location != "") {
        db.query(sql7,[preference_location,notice_period
          ,exp_ctc,current_ctc,department,id], function(err, result) {
              if (err) throw err;
              var prid = result.insertId;
              res.json({prid:prid});
              console.log("Prefrences is inserted successfully");
              notifier.notify("Form Submitted Successfully!!!");
  
      });
      }

  }else{

    if (preference_location != "") {
    let sqlwo = `select preference_id from preferences where e_id=${id}`;

    db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 
     let work_id1 = result[0].preference_id;
      console.log(work_id1);

    const sql =`UPDATE preferences
    SET preference_location = ?, notice_period = ?,expected_ctc = ?,
    current_ctc = ?,department = ?  WHERE e_id = ${id}`;
 
    
      db.query(sql,[preference_location,notice_period
        ,exp_ctc,current_ctc,department], function(err, result) {
            if (err) throw err;

            res.json({prid:work_id1});
          
            console.log("Prefrences is inserted successfully");
            notifier.notify("Form Submitted Successfully!!!");
    });
  

  });

  }
}

    // res.redirect('/');

});




module.exports = router;