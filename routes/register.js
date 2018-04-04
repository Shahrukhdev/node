var express = require('express');
var router = express.Router();
var db=require('../dbconnect');
var md5 = require('md5');

/* GET home page. */

router.post('/', function(req, res, next) {
  var query="insert into signup (name,email,password) values(?,?,?)";
db.query(query,[req.body.name,req.body.email,md5(req.body.password)],function(err, db_data){
  if(err) throw err;
});
  res.render('index');
});



/* GET home page. */
// router.get('/', function(req, res, next) {
//   db.query('SELECT * from articles', function(err, rows, fields) {
// db.end();
//   if (!err)
//     {
//     	res.json(rows);
//     }
//   else
//     console.log(err);
//   });
// });


module.exports = router;
