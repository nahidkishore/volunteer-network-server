    const express = require('express')
    const app = express()
    const MongoClient = require('mongodb').MongoClient;
    require('dotenv').config()
    const port=7000
    const bodyParser= require('body-parser');
    const cors= require('cors');

    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    app.use(cors());
    app.use(bodyParser.json());

    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
    client.connect(err => {
      const registerEventsCollection = client.db("volunteerNetwork").collection("events");
    
app.post('/addRegisteredEvent',(req,res) => {
  const newRegistration =req.body;
  registerEventsCollection.insertOne(newRegistration)
  .then(result => {
   
    res.send(result.insertedCount > 0)
  })
  console.log(newRegistration);
})

app.get('/events',(req, res)=>{
  //console.log(req.body.email);
  registerEventsCollection.find({email:req.query.email})
  .toArray((err,documents)=>{
    res.send(documents)
  })
})
   //delete
 app.delete('/delete/:id',(req, res)=>{
  /*  console.log(req.params.id); */
 registerEventsCollection.deleteOne({_id: ObjectId (req.params.id)})
 .then((result)=>{
    console.log(result);
 res.send('everything is fine')
 })
 })
    });


    app.get('/', function (req, res) {
      res.send('hello world')
    })


    app.listen(port)