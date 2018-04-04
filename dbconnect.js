var mysql=require('mysql');
 var connection=mysql.createPool({

host:'localhost',
 user:'root',
 password:'',
 database:'nodedemo'

});
//  connection.connect(function(err){
// if(!err) {
//     console.log("Database is connected ... nn");
// } else {
//     console.log("Error connecting database ... nn");
// }
// });
 module.exports=connection;
