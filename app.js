var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signup = require('./routes/signup');
var register = require('./routes/register');
var logins =require('./routes/login');
//var flash = require('express-flash-messages');
var flash=require('connect-flash');
var session = require('express-session');
var router = express.Router();
var methodOverride = require('method-override')
var sessionStore = new session.MemoryStore;
var multer =  require('multer');


var app = express();

app.use(session({
    cookie: { maxAge: 6000000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// middleware to make 'user' available to all templates
// app.use(function(req, res, next) {
//   res.locals.user = req.session.email;
//   next();
// });
// app.use('/public/uploads/', express.static(path.join(__dirname, '/public/uploads/')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signup);
app.use('/register', register);
 app.use('/login', logins);
 app.use('/logout',require('./routes/logout'));
require('./routes/records')(app);
require('./routes/reports')(app);

 app.get('*', function(req, res){

  res.render('404',{email:req.session.email});
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
