const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('../../db');
const notifier = require('node-notifier');
var bodyParser = require('body-parser');
const verifyUser = require("../../middleware/authentication");

// Middleware to parse request bodies
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/simpleform',verifyUser, function(req, res, next) {
  res.render('simpleform/form'); // Assuming you have a template engine for rendering
});

router.post('/create',verifyUser, function(req, res) {
    //basic details
    const first_name = req.body.first_name || "";
    const last_name = req.body.last_name || "";
    const deg1 = req.body.deg1 || "";
    const email = req.body.email || "";
    const phone_no = req.body.phone_no || "";
    const gender = req.body.gender || "";
    const relationship_status = req.body.relationship_status || "";
    const date_of_birth = req.body.date_of_birth || "";
    const address_1 = req.body.address_1 || "";
    const address_2 = req.body.address_2 || "";
    const city = req.body.city || "";
    const state = req.body.state || "";
    const zip_code = req.body.zip_code || "";

    //education details
    const ssc_name = req.body.ssc_name || "";
    const ssc_passing_year = req.body.ssc_passing_year || "";
    const ssc_percentage = req.body.ssc_percentage || "";
    const hsc_name = req.body.hsc_name || "";
    const hsc_passing_year = req.body.hsc_passing_year || "";
    const hsc_percentage = req.body.hsc_percentage || "";
    const b_course_name = req.body.b_course_name || "";
    const b_university = req.body.b_university || "";
    const b_passing_year = req.body.b_passing_year || "";
    const b_percentage = req.body.b_percentage || "";
    const m_course_name = req.body.m_course_name || "";
    const m_university = req.body.m_university || "";
    const m_passing_year = req.body.m_passing_year || "";
    const m_percentage = req.body.m_percentage || "";

    //work experience
    const company_name = req.body.company_name || "";
    const deg2 = req.body.deg2 || "";
    const from_date = req.body.from_date || "";
    const to_date = req.body.to_date || "";

    //language
  let  hindi = req.body.hindi || "";
  let  hindiread = req.body.hindiread || "";
  let  hindiwrite = req.body.hindiwrite || "";
  let  hindispeak = req.body.hindispeak || "";

  let  english = req.body.english || "";
  let  englishread = req.body.englishread || "";
  let  englishwrite = req.body.englishwrite || "";
  let  englishspeak = req.body.englishspeak || "";

  let  gujrati = req.body.gujrati || "";
  let  gujratiread = req.body.gujratiread || "";
  let  gujratiwrite = req.body.gujratiwrite || "";
  let  gujratispeak = req.body.gujratispeak || "";

    //technolgy
    const php = req.body.php || "" ;
    const phplevel = req.body.phplevel || "" ;
    const mysql = req.body.mysql || "" ;
    const mysqllevel = req.body.mysqllevel || "" ;
    const laravel = req.body.laravel || "" ;
    const laravellevel = req.body.laravellevel || "" ;
    const oracle = req.body.oracle || "" ;
    const oraclelevel = req.body.oraclelevel || "" ;
    
    
    //reference contact
    const ref_name = req.body.ref_name || "" ;
    const ref_contact_no = req.body.ref_contact_no || "" ;
    const relation = req.body.relation || "" ;

    //prefrence
    const preference_location = req.body.preference_location || "" ;
    const notice_period = req.body.notice_period || "" ;
    const expected_ctc = req.body.expected_ctc || "" ;
    const current_ctc = req.body.current_ctc || "" ;
    const department = req.body.department || "" ;
 

  //  console.log(req.body);htm
  //  res.redirect('/');
  //   return
   
    const sql = `INSERT INTO 
    employee_details(first_name,last_name,deg1,email,phone_no,address1,address2
    ,gender,relationship_status,date_of_birth,city,state,zip_code)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      
    db.query(sql,[first_name,last_name,deg1,email,phone_no,address_1,address_2,
    gender,relationship_status,date_of_birth,city,state,zip_code], function(err, result) {
  
      if (err) throw err;
      console.log("User 1 is inserted successfully");


      let pid = result.insertId;
      
      if (ssc_name != "" || hsc_name != "") {
        const sql1 = `INSERT INTO 
        employee_school(ssc_name,ssc_passing_year,ssc_percentage,hsc_name,hsc_passing_year,hsc_percentage,emp_id)
        values(?,?,?,?,?,?,?)`;
        
       db.query(sql1,[ssc_name,ssc_passing_year,ssc_percentage,
        hsc_name,hsc_passing_year,hsc_percentage,pid], function(err, result) {
          if (err) throw err;
          
          console.log("User 2 is inserted successfully");
  
          });
      }
     

      if (b_course_name != "") {
        const sql2 = `INSERT INTO 
        employee_college(b_course_name,b_university
          ,b_passing_year,b_percentage,m_course_name,m_university
          ,m_passing_year,m_percentage,e_id)
        values(?,?,?,?,?,?,?,?,?)`;
  
        db.query(sql2,[b_course_name,b_university,b_passing_year,b_percentage,m_course_name
          ,m_university,m_passing_year,m_percentage,pid], function(err, result) {
              if (err) throw err;
              console.log("User 3 is inserted successfully");
          
      });
      }
  

    const sql3 = `INSERT INTO 
    work_experience(company_name,deg2
      ,from_date,to_date,e_id)
    values(?,?,?,?,?)`;
  
if (company_name != "") {
  for (let i = 0; i < company_name.length; i++) {

db.query(sql3,[company_name[i],deg2[i]
    ,from_date[i],to_date[i],pid], function(err, result) {
      if (err) err.message; 
      console.log("User 4 is inserted successfully");
});  
}
}

const sql_lang_1 = `INSERT INTO 
language(lan1,redo
,wedo,sedo  ,e_id)
values('${hindi}','${hindiread}','${hindiwrite}','${hindispeak}','${pid}')`;

  if (hindi != "") {
db.query(sql_lang_1, function(err, result) {
  if (err) throw err;
  console.log("User 5 is inserted successfully");
});
  }
   

const sql_lang_2 = `INSERT INTO 
    language(lan1,redo
  ,wedo,sedo  ,e_id)
values('${english}','${englishread}','${englishwrite}','${englishspeak}','${pid}')`;

if (english != "") {
  db.query(sql_lang_2, function(err, result) {
    if (err) throw err;
    console.log("User 5 is inserted successfully");
  });
}

const sql_lang_3 = `INSERT INTO 
    language(lan1,redo
  ,wedo,sedo  ,e_id)
values('${gujrati}','${gujratiread}','${gujratiwrite}','${gujratispeak}','${pid}')`;

 if (gujrati != "") {
  db.query(sql_lang_3, function(err, result) {
    if (err) throw err;
    console.log("User 5 is inserted successfully");
  });
 }


    const sql_tech_1 = `INSERT INTO 
    technology(language,level,e_id)
    values('${php}','${phplevel}','${pid}')`;
    if (php != "") {
      db.query(sql_tech_1, function(err, result) {
        if (err) throw err;
        console.log("User 6 is inserted successfully");
      });
    }

    const sql_tech_2 = `INSERT INTO 
    technology(language,level,e_id)
    values('${mysql}','${mysqllevel}','${pid}')`;

    if (mysql != "") {
      db.query(sql_tech_2, function(err, result) {
        if (err) throw err;
        console.log("User 6 is inserted successfully");
        });
    }

    const sql_tech_3 = `INSERT INTO 
    technology(language,level,e_id)
    values('${laravel}','${laravellevel}','${pid}')`;

    if (laravel != "") {
      db.query(sql_tech_3, function(err, result) {
        if (err) throw err;
        console.log("User 6 is inserted successfully");
        });
    }

    const sql_tech_4 = `INSERT INTO 
    technology(language,level,e_id)
    values('${oracle}','${oraclelevel}','${pid}')`;

    if (oracle != "") {
    db.query(sql_tech_4, function(err, result) {
      if (err) throw err;
      console.log("User 6 is inserted successfully");
      });
    }

const sql6 = `INSERT INTO 
  ref_contact(ref_name,ref_contact_no
    ,relation,e_id)
  values(?,?,?,?)`;

 
    for (let i = 0; i < ref_name.length; i++) {
      if (ref_name[i] != "") {
        db.query(sql6,[ref_name[i],ref_contact_no[i]
          ,relation[i],pid], function(err, result) {
            if (err) err.message; 
           
            console.log("User 7 is inserted successfully");
      });  
      }
      
      }
  
   
  const sql7 = `INSERT INTO 
  preferences(preference_location,notice_period
        ,expected_ctc,current_ctc,department,e_id)
      values(?,?,?,?,?,?)`;
    if (preference_location != "") {
      db.query(sql7,[preference_location,notice_period
        ,expected_ctc,current_ctc,department,pid], function(err, result) {
            if (err) throw err;  
            console.log("User 8 is inserted successfully");
    });
    }
 
    res.redirect('/home/simpleform'); // Redirect to the form page after inserting data
    notifier.notify("Your Details Submitted!!");
    });

  });

  router.get('/update/:id',verifyUser, function(req, res, next) {

    var id = req.params.id;
  
    sql1= `select * from employee_details where e_id=${id}`;
    sql2= `select * from employee_school where emp_id=${id}`;
    sql3= `select * from employee_college where e_id=${id}`;
    sql4= `select * from work_experience where e_id=${id}`;
    sql5= `select * from language where e_id=${id}`;
    sql6= `select * from technology where e_id=${id}`;
    sql7= `select * from ref_contact where e_id=${id}`;
    sql8= `select * from preferences where e_id=${id}`;
    

    db.query(`${sql1};${sql2};${sql3};${sql4};
    ${sql5};${sql6};${sql7};${sql8};`, function(err, result) {
          if (err) throw err;
          
          var employee_details = result[0];
          var employee_school = result[1];
          var employee_college = result[2];
          var work_experience = result[3];
          var language = result[4];
          var technology = result[5];
          var ref_contact = result[6];
          var preferences = result[7];

          console.log(employee_details,employee_school,employee_college,work_experience,
            language,technology,ref_contact,preferences);
            console.log(language.length);
            
          res.render('simpleform/update',{employee_details,employee_school,employee_college,work_experience,
            language,technology,ref_contact,preferences,id});
  });
    
   ; // Assuming you have a template engine for rendering
  });
  
  router.post('/finalupdate',verifyUser, function(req, res, next) {
    var id = req.body.id;
    
    const first_name = req.body.first_name || "";
    const last_name = req.body.last_name || "";
    const deg1 = req.body.deg1 || "";
    const email = req.body.email || "";
    const phone_no = req.body.phone_no || "";
    const gender = req.body.gender || "";
    const relationship_status = req.body.relationship_status || "";
    const date_of_birth = req.body.date_of_birth || "";
    const address_1 = req.body.address_1 || "";
    const address_2 = req.body.address_2 || "";
    const city = req.body.city || "";
    const state = req.body.state || "";
    const zip_code = req.body.zip_code || "";

    //education details
    const ssc_name = req.body.ssc_name || "";
    const ssc_passing_year = req.body.ssc_passing_year || "";
    const ssc_percentage = req.body.ssc_percentage || "";
    const hsc_name = req.body.hsc_name || "";
    const hsc_passing_year = req.body.hsc_passing_year || "";
    const hsc_percentage = req.body.hsc_percentage || "";
    const b_course_name = req.body.b_course_name || "";
    const b_university = req.body.b_university || "";
    const b_passing_year = req.body.b_passing_year || "";
    const b_percentage = req.body.b_percentage || "";
    const m_course_name = req.body.m_course_name || "";
    const m_university = req.body.m_university || "";
    const m_passing_year = req.body.m_passing_year || "";
    const m_percentage = req.body.m_percentage || "";

    //work experience
    const company_name = req.body.company_name || "";
    const deg2 = req.body.deg2 || "";
    const from_date = req.body.from_date || "";
    const to_date = req.body.to_date || "";

    //language
  let  hindi = req.body.hindi || "";
  let  hindiread = req.body.hindiread || "";
  let  hindiwrite = req.body.hindiwrite || "";
  let  hindispeak = req.body.hindispeak || "";

  let  english = req.body.english || "";
  let  englishread = req.body.englishread || "";
  let  englishwrite = req.body.englishwrite || "";
  let  englishspeak = req.body.englishspeak || "";

  let  gujrati = req.body.gujrati || "";
  let  gujratiread = req.body.gujratiread || "";
  let  gujratiwrite = req.body.gujratiwrite || "";
  let  gujratispeak = req.body.gujratispeak || "";

    //technolgy
    const php = req.body.php || "" ;
    const phplevel = req.body.phplevel || "" ;
    const mysql = req.body.mysql || "" ;
    const mysqllevel = req.body.mysqllevel || "" ;
    const laravel = req.body.laravel || "" ;
    const laravellevel = req.body.laravellevel || "" ;
    const oracle = req.body.oracle || "" ;
    const oraclelevel = req.body.oraclelevel || "" ;
    
    
    //reference contact
    const ref_name = req.body.ref_name || "" ;
    const ref_contact_no = req.body.ref_contact_no || "" ;
    const relation = req.body.relation || "" ;

    //prefrence
    const preference_location = req.body.preference_location || "" ;
    const notice_period = req.body.notice_period || "" ;
    const expected_ctc = req.body.expected_ctc || "" ;
    const current_ctc = req.body.current_ctc || "" ;
    const department = req.body.department || "" ;

   


    const sql1 =  `UPDATE employee_details
    SET first_name = ?, last_name = ?,deg1 = ?,email = ?,phone_no = ?,
    address1 = ?,address2 = ?,gender = ?,relationship_status = ?,date_of_birth = ?,city = ?,state = ?,zip_code =?
   WHERE e_id = ${id}`;

    db.query(sql1,[first_name,last_name,deg1,email,phone_no,address_1,address_2,
    gender,relationship_status,date_of_birth,city,state,zip_code], function(err, result) {
  
      if (err) throw err;
      console.log("User 1 is updated successfully");
    });


    
   if (ssc_name != "" || hsc_name != "") {

    const sql2 =  `UPDATE employee_school
    SET ssc_name = ?, ssc_passing_year = ?,ssc_percentage = ?,hsc_name = ?,hsc_passing_year = ?,
    hsc_percentage = ? WHERE emp_id = ${id}`;

   db.query(sql2,[ssc_name,ssc_passing_year,ssc_percentage,
    hsc_name,hsc_passing_year,hsc_percentage], function(err, result) {
      if (err) throw err;
      
      console.log("User 2 is Updated successfully");

      });
  }

  if (b_course_name != "") {
    const sql3 = `UPDATE employee_college
    SET b_course_name = ?, b_university = ?,b_passing_year = ?,b_percentage = ?,m_course_name = ?,
    m_university = ?, m_passing_year = ?, m_percentage = ? WHERE e_id = ${id}`;

    db.query(sql3,[b_course_name,b_university,b_passing_year,b_percentage,m_course_name
      ,m_university,m_passing_year,m_percentage], function(err, result) {
          if (err) throw err;
          console.log("User 3 is inserted successfully");
      
  });
  }

  
 if (company_name[0] != '') {
  let sqlwo = `select e_work_experience_id from work_experience where e_id=${id}`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[0].e_work_experience_id;
      console.log(work_id1);

      let sqlw1 = `UPDATE work_experience
  SET company_name = '${company_name[0]}', deg2 = '${deg2[0]}',from_date = '${from_date[0]}',to_date = '${to_date[0]}'
   WHERE e_id = ${id} and e_work_experience_id = ${work_id1}`;
      

      db.query(`${sqlw1}`, function(err, result) {
        console.log("User 4 is inserted successfully");
      });

      
});  
}
 

if (company_name[1] != '') {
  let sqlwo = `select e_work_experience_id from work_experience where e_id=${id}`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id2 = result[1].e_work_experience_id;
      console.log(work_id2);

      let sqlw1 = `UPDATE work_experience
  SET company_name = '${company_name[1]}', deg2 = '${deg2[1]}',from_date = '${from_date[1]}',to_date = '${to_date[1]}'
   WHERE e_id = ${id} and e_work_experience_id = ${work_id2}`;
     

      db.query(`${sqlw1}`, function(err, result) {
        console.log("User 4 is inserted successfully");
      });

      
});  
}

if (company_name[2] != '') {
  let sqlwo = `select e_work_experience_id from work_experience where e_id=${id}`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id3 = result[2].e_work_experience_id;
      console.log(work_id3);

      let sqlw1 = `UPDATE work_experience
  SET company_name = '${company_name[2]}', deg2 = '${deg2[2]}',from_date = '${from_date[2]}',to_date = '${to_date[2]}'
   WHERE e_id = ${id} and e_work_experience_id = ${work_id3}`;
     

      db.query(`${sqlw1}`, function(err, result) {
        console.log("User 4 is inserted successfully");
      });

      
});  
}

if (hindi != '') {
  let sqlwo = `select language_id from language where e_id=${id} and lan1='${hindi}'`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[0].language_id;
      

      let sqlw1 = `UPDATE language
      SET lan1 = '${hindi}', redo = '${hindiread}',wedo = '${hindiwrite}',sedo = '${hindispeak}'
       WHERE e_id = ${id} and language_id =${work_id1} `;
    

      db.query(`${sqlw1}`, function(err, result) {
        console.log("User 5 is inserted successfully");
      });

});  
}

if (english != '') {
  let sqlwo = `select language_id from language where e_id=${id} and lan1='${english}'`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[0].language_id;
      

      let sqlw1 = `UPDATE language
      SET lan1 = '${english}', redo = '${englishread}',wedo = '${englishwrite}',sedo = '${englishspeak}'
       WHERE e_id = ${id} and language_id =${work_id1} `;
    
      db.query(`${sqlw1}`, function(err, result) {
        console.log("User 5 is inserted successfully");
      });

});  
}

if (gujrati != '') {
  let sqlwo = `select language_id from language where e_id=${id} and lan1='${gujrati}'`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[0].language_id;
      

      let sqlw1 = `UPDATE language
      SET lan1 = '${gujrati}', redo = '${gujratiread}',wedo = '${gujratiwrite}',sedo = '${englishspeak}'
       WHERE e_id = ${id} and language_id =${work_id1} `;
      
      db.query(`${sqlw1}`, function(err, result) {
        console.log("User 5 is inserted successfully");
      });

});  
}


if (php != '') {
  let sqlwo = `select tech_id from technology where e_id=${id} and language='${php}'`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[0].tech_id;
      

      let sqlw1 = `UPDATE technology
      SET language = '${php}', level = '${phplevel}' WHERE e_id = ${id} and tech_id =${work_id1} `;
      console.log(sqlw1);

      db.query(`${sqlw1}`, function(err, result) {
        if (err) err.message; 

        console.log("User 6 is inserted successfully");
      });

});  
}

if (mysql != '') {
  let sqlwo = `select tech_id from technology where e_id=${id} and language='${mysql}'`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[0].tech_id;
      

      let sqlw1 = `UPDATE technology
      SET language = '${mysql}', level = '${mysqllevel}' WHERE e_id = ${id} and tech_id =${work_id1} `;
      console.log(sqlw1);

      db.query(`${sqlw1}`, function(err, result) {
        if (err) err.message; 

        console.log("User 6 is inserted successfully");
      });

});  
}

if (oracle != '') {
  let sqlwo = `select tech_id from technology where e_id=${id} and language='${oracle}'`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[0].tech_id;
      

      let sqlw1 = `UPDATE technology
      SET language = '${oracle}', level = '${oraclelevel}' WHERE e_id = ${id} and tech_id =${work_id1} `;
      console.log(sqlw1);

      db.query(`${sqlw1}`, function(err, result) {
        if (err) err.message; 

        console.log("User 6 is inserted successfully");
      });

});  
}

if (laravel != '') {
  let sqlwo = `select tech_id from technology where e_id=${id} and language='${laravel}'`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[0].tech_id;
      

      let sqlw1 = `UPDATE technology
      SET language = '${laravel}', level = '${laravellevel}' WHERE e_id = ${id} and tech_id =${work_id1} `;
      console.log(sqlw1);

      db.query(`${sqlw1}`, function(err, result) {
        if (err) err.message; 

        console.log("User 6 is inserted successfully");
      });

});  
}



 if (ref_name[0] != '') {
  let sqlwo = `select ref_contact_id from ref_contact where e_id=${id}`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[0].ref_contact_id;
      

      let sqlw1 = `UPDATE ref_contact 
  SET ref_name = '${ref_name[0]}', ref_contact_no = '${ref_contact_no[0]}',relation = '${relation[0]}'
   WHERE e_id = ${id} and ref_contact_id = ${work_id1}`;
   
      db.query(`${sqlw1}`, function(err, result) {
        console.log("User 7 is inserted successfully");
      });
      
});  
}

if (ref_name[1] != '') {
  let sqlwo = `select ref_contact_id from ref_contact where e_id=${id}`;

  db.query(`${sqlwo}`, function(err, result) {
      if (err) err.message; 

      let work_id1 = result[1].ref_contact_id;
     

      let sqlw1 = `UPDATE ref_contact 
  SET ref_name = '${ref_name[1]}', ref_contact_no = '${ref_contact_no[1]}',relation = '${relation[1]}'
   WHERE e_id = ${id} and ref_contact_id = ${work_id1}`;

      db.query(`${sqlw1}`, function(err, result) {
        console.log("User 7 is inserted successfully");
      });
      
});  
}


 const sql7 =`UPDATE preferences
 SET preference_location = ?, notice_period = ?,expected_ctc = ?,current_ctc = ?,department = ?  WHERE e_id = ${id}`;
 
    if (preference_location != "") {
      db.query(sql7,[preference_location,notice_period
        ,expected_ctc,current_ctc,department], function(err, result) {
            if (err) throw err;
            console.log("User 8 is inserted successfully");
    });
    }
   
    res.redirect('/home/simpleform'); 
    notifier.notify("Your Details Updated!!");
  });
module.exports = router;