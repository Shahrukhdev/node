var express = require('express');
var router = express.Router();
var db=require('../dbconnect');
var md5 = require('md5');
var session = require('express-session');
var flash = require('connect-flash');
const nodemailer=require('nodemailer');
var multer=require('multer');

const filepath='http://localhost:3000/';
var limits = { fileSize: 10 * 1024 * 1024 }
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {

      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ limits: limits, storage: storage }).single("file");


module.exports = (app) => {

  function mailer()
  {
    const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'uoobwf76c3qzuqor@ethereal.email',
        pass: 'DVJ8fZeFDXPsmy85EZ'
    }
});
  var mailOptions = {
    from: 'it.shahrukh@gmail.com',
    to: 'shahrukh.khan@mobilecoderz.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("error"+error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  }
    app.get('/addrecord', (req, res) => {
      res.render("addrecords",{msg:req.flash('saverecord')});
    });

    app.post('/saverecord', (req, res) => {
      mailer();
      upload(req, res, function (err, data) {
        console.log(req.body);
         if (err) {
           console.log(err);
           //res.write(err);
             return res.end("Something went wrong!"+err);
         }

          var file_name = "uploads/"+req.file.filename;
          console.log(file_name);
         // res.json({'status':200,'data': {'msg':'File uploaded successfully', 'fileUrl':file_name}});

            var query="insert into records (name,email,password,dob,address,country,imageurl) values(?,?,?,?,?,?,?)";
          db.query(query,[req.body.name,req.body.email,md5(req.body.password),req.body.dateofbirth,req.body.address,req.body.country,file_name],function(err, db_data){
            if(err) throw err;
          });
         //res.send("save");
          req.flash('saverecord',"Data Successfully Stored.");
          res.redirect('/addrecord');
     });

    });

    app.delete('/deleterecord/:id',(req,res)=>{
      var id=req.param("id");
      console.log(id);

      var query='delete from records where id=?';
      db.query(query,[id],function(err,db_data){
        if(err) throw err;
      else
        res.redirect('/');
      });
    });

    app.put('/updaterecord/:id',function(req,res){
      try{
      var id=req.param('id');
      console.log(req.body);
      console.log("name:",req.body.name);

      var query='update records set name=? ,email=? ,dob=?, address=?, country=? where id=?';
      db.query(query,[req.body.name,req.body.email,req.body.dob,req.body.address,req.body.country,id],function(err,db_data){
        if(err) throw err;
      else
        {
          console.log("your query="+query.sql);
          res.json({'status':1});
        }
      });

    }
    catch(error)
    {
      console.log("Catch error"+error);
    }
    });


  }
