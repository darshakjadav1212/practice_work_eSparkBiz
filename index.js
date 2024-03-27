const express  = require('express');
const app = express();

const  dotenv = require('dotenv');
let result = dotenv.config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));

var homeRouter = require('./routes/home/home');
app.use('/', homeRouter);

var eventHandleRouter = require('./routes/eventHandle/eventHandle');
app.use('/home', eventHandleRouter);

var dynamicRouter = require('./routes/dynamic_table/dynamic_table');
app.use('/home', dynamicRouter);

var koko = require('./routes/koko/koko');
app.use('/home', koko);

var tic_tac_toe = require('./routes/tic_tac_toe/tic_tac_toe');
app.use('/home', tic_tac_toe)

var adduserRouter = require('./routes/adduser/adduser');
app.use('/home', adduserRouter)

var listRouter = require('./routes/list/list');
app.use('/home', listRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 