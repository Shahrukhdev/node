var express = require('express');
var router = express.Router();
var db=require('../dbconnect');
var md5 = require('md5');
var session = require('express-session');
var flash = require('connect-flash')



/* GET home page. */
router.post('/', function(req, res, next) {

  if(!req.session.email)
  {
    var pass=md5(req.body.password);
    var query="select * from signup where email=? and password=? ";
  db.query(query,[req.body.email,md5(req.body.password)],function(err, db_data){
    if(err) throw err;
    numRows = db_data.affectedRows;
    if(db_data.length)
    {
      // sessionData = req.session;
      // var userDetails = {}

      // //set the session
      // sessionData.isLogin = 1;
      // sessionData.name = req.body.name;
      // sessionData.email = req.body.email;

      //otherway
      req.session.email=req.body.email;
      res.redirect('/');
      //  res.render("homepage",{email:req.session.email});
    }
    else
    {req.flash('notify','Wrong Email and Password');
      res.render("index",{expressFlash:req.flash('notify')});
    }


  });}
  else {
    res.render("homepage",{email:req.session.email});
  }

});



module.exports = router;
