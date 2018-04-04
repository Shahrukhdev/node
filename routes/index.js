var express = require('express');
var db=require('../dbconnect');
//var flash = require('express-flash-messages')
var flash=require('connect-flash');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.email)
  {
  res.render('index', { title: 'Express' });
  }
else {
  var query="select * from records";
  db.query(query,function(err,db_data){
    if(err) throw err;
      if(db_data.length)
      console.log(db_data);
        res.render("homepage",{email:req.session.email,data:db_data});
  });
}
});

module.exports = router;
