var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contacts = require('./routes/contact');

var MongoURI = process.env.MONGOURI || 'mongodb://localhost:27017/testdb';
mongoose.connect(MongoURI, (err, res) => {
  if (err) {
    console.log('Error connecting to: ' + MongoURI + ', ' + err);
  } else {
    console.log('MongoDb connected successfully to ' + MongoURI);
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Set Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/layout');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contacts);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
