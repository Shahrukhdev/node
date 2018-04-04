var express = require('express');
var router = express.Router();
var db=require('../dbconnect');
var md5 = require('md5');
var session = require('express-session');
var flash = require('connect-flash');


router.get('/', function(req, res, next) {
    req.flash('notify', 'Log out Successfully.');
  res.render("index",{expressFlash:req.flash('notify')});
  req.session.destroy();

});

module.exports = router;
