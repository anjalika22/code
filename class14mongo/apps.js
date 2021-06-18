const express = require('express');
const apps = express();
const port = 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const mongourl = "mongodb://localhost:27017";
let db;


//health Check
apps.get('/',(req,res) => {
    res.send("Health Ok");
});

//city Route
apps.get('/city',(req,res) => {
    db.collection('city').find().toArray((err,result) => {
      if(err) throw err;
      res.send(result);
    })
   
});

//rest details
apps.get('/rest/:id',(req,res) =>{
  
  db.collection('restaurent').find({_id:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
});
//Rest route
apps.get('/rest',(req,res) => {

  db.collection('restaurent').find(condition).toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
  }) 
});
//MealType Route
apps.get('/meal',(req,res) => {
  db.collection('mealtype').find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })

});
//cuisine route
apps.get('/cuisine',(req,res) => {
  db.collection('cuisine').find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })

});
//connection with mongo serer
MongoClient.connect(mongourl,(err,connection) => {
  if(err) console.log(err);
  db = connection.db('edunov ');

  apps.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
  })
});