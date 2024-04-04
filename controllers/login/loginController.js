const mysql = require('mysql');
const db = require('../../db');
const notifier = require('node-notifier');
var bodyParser = require('body-parser');
const md5 = require('md5') 
 
const jwt = require('jsonwebtoken'); 

const secret_key = process.env.SECRET_KEY;

function randomStr(len, arr) {
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans +=
            arr[(Math.floor(Math.random() * arr.length))];
    }
    return ans;
}

const getLoginController = (req,res) =>{
    res.render('login/login');
}

const getSignUpController = (req,res) =>{
    res.render('login/register');
}

const postLoginController = (req,res) =>{

    var email  = req.body.email;
    var password = req.body.password;

    var test = `select email from register where email = '${email}'`;

    db.query(`${test}`, function(err, result) {
        if (err) err.message;
        console.log(result.length);

        if (result.length == 1) {
            
            var sql;
            sql = `select * from register where email ='${email}'`;

            db.query(`${sql}`, function(err, result) {
            if (err) err.message;

            let salt = result[0].salt;
            let dbpassword = result[0].password;

                
             password = md5(salt + password);

             if (password == dbpassword) {
                notifier.notify(`Your are logged in now!!!`);


                const token = jwt.sign({id:salt},secret_key)
                console.log(token);
                res.cookie("token",token,{
                    httpOnly:true,
                    secure:true,
                    sameSite:'strict',
                    expires:new Date(Date.now() + 200000000)
                })
                res.redirect('/home');
             }
             else{
                notifier.notify("Invalid Credentials!!!!")
                console.log("Please Enter Correct Password");
                res.redirect('/');
             }

         });

        }
        else{
             notifier.notify(" OR Please SignUp first!!!!!!");
        }

        });

}

const getActivateController  = (req,res) =>{
    let code = req.query.code;

    let updatequery = `update register set  activation_status = 1 where activation='${code}'`;
    let selectquery = `select username from register where activation='${code}'`;

    db.query(`${selectquery};${updatequery}`, function(err, result) {
        if (err) err.message; 
        console.log(updatequery,selectquery,result);
        let name  = result[0][0].username;
        res.render('login/confirm',{name});
        notifier.notify("Your account is activated now!!!")
    });
}

const postSignUpController = (req,res) =>{
    var arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const mailString = randomStr('20',arr);
    const salt = randomStr('4',arr);

    const username = req.body.username;
    const email = req.body.email;

    const password = md5(salt + req.body.password);
    const confirm_password = md5(salt +req.body.password); 

    console.log(mailString);
    console.log(salt);
    console.log(username,email,password,confirm_password);
    
    let activationLink = `http://localhost:3001/activate?code=${mailString}`;

    var test = `select email from register where email = '${email}'`;

    db.query(`${test}`, function(err, result) {
        if (err) err.message;

        console.log(result);

        if (result == "" || result == null) {
            let sql;
            sql = `INSERT INTO register(username,email,password,activation,salt) values('${username}','${email}',
            '${password}','${mailString}','${salt}')`;
            db.query(`${sql}`, function(err, result) {
                if (err) err.message; 
                console.log(sql);
                console.log('User Register!!....');
                notifier.notify("Please click on the link!! ! ");
                res.render('login/activate',{activationLink});
            });
        }else{
            notifier.notify('User Already Exist!!');
            res.redirect('/signup');
        }
            
    }); 
}

module.exports = {getLoginController,postLoginController,getSignUpController
                ,getActivateController,postSignUpController};