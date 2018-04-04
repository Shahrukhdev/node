var express = require('express');
var db=require('../dbconnect');
//var flash = require('express-flash-messages')
var flash=require('connect-flash');
var fs=require('fs');
var router = express.Router();

function csv()
{
  var jsn = [{
    "name": "Nilesh",
    "school": "RDTC",
    "marks": "77"
   },{
    "name": "Sagar",
    "school": "RC",
    "marks": "99.99"
   },{
    "name": "Prashant",
    "school": "Solapur",
    "marks": "100"
 }];

var data='';
for (var i = 0; i < jsn.length; i++) {
    data=data+jsn[i].name+'\t'+jsn[i].school+'\t'+jsn[i].marks+'\n';
 }
fs.appendFile(Date.now()+'Filenamef.xls', data, (err) => {
    if (err) throw err;
    console.log('File created');


 });
}

module.exports = (app) => {
    app.get('/csv', (req, res) => {
      csv();
      res.send("Excel generated");
      res.end();
    });

}
