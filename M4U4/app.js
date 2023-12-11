var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/ingresar', function(req,res){
  var parametro = req.body.parametro || '';

  var parametro1 = 'helado';
  var parametro2 = 'carne';
  var parametro3 = 'agua';

  var respuesta1 = "El kilogramo de helado cuesta $5000.";
  var respuesta2 = "El kilogramo de carne cuesta $10000.";
  var respuesta3 = "El litro de agua cuesta $1000.";

  switch(parametro){
    case(parametro1):
      res.send(respuesta1);
      break;
    case(parametro2):
    res.send(respuesta2);
    break;
    case(parametro3):
      res.send(respuesta3);
      break;
  }
})

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
