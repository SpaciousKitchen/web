const express =require('express')
const errorhandler =require('errorhandler')
const mongoose=require('mongoose')
const logger=require('morgan')
const bodyParser = require('body-parser')
const path=require('path')

app=express()
app.use(errorhandler())
app.use(logger('dev'))
app.use(bodyParser.json())

var index=require('./router/index')
var app=express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1/notice_board',{ useNewUrlParser: true })

var db=mongoose.connection;

db.on('error',console.error.bind(console,'Connection Error'))

db.once('open',function(){
    console.log('connected Successfully');
})

app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug'); //html rednering erro

app.engine('html', require('pug').renderFile);
app.use(logger('dev'));
//app.use(express.urlencoded());
//app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname,'public')));
app.use('/',index);

 app.listen(3000)