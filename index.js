const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectId= require('mongodb').ObjectID;
require("dotenv").config();
const port = 7000;
const bodyParser = require("body-parser");
const cors = require("cors");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const registerEventsCollection = client.db(process.env.DB_NAME).collection("events");
  const AllDataCollection = client.db(process.env.DB_NAME).collection("datas");

  //register list

  app.get("/allRegisteredEvents", (req, res) => {
    registerEventsCollection.find({}).toArray((error, documents) => {
      res.send(documents);
    });
  });

  //
  app.get("/datas", (req, res) => {
    AllDataCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/singleData/:id", (req, res) => {
    AllDataCollection.find({ id: req.params.id }).toArray((err, documents) => {
      res.send(documents[0]);
    });
  });

  app.post("/addAllData", (req, res) => {
    const data = req.body;
    AllDataCollection.insertOne(data).then((result) => {
      console.log(result);
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/addRegisteredEvent", (req, res) => {
    const newRegistration = req.body;
    registerEventsCollection.insertOne(newRegistration).then((result) => {
      res.send(result.insertedCount > 0);
    });
    console.log(newRegistration);
  });

  app.get("/events", (req, res) => {
    //console.log(req.query.email);
    registerEventsCollection
      .find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });


//admin delete 

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  AllDataCollection.deleteOne({_id:ObjectId (id)})
    .then(result => {
      res.send(result.deletedCount > 0)
    })
    
})

 //cancel 
   app.delete('/cancelEvent/:id', (req, res) => {
  const id = req.params.id;
  registerEventsCollection.deleteOne({_id:ObjectId (id)})
    .then(result => {
      res.send(result.deletedCount > 0)
    })
    
})




  
});

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(process.env.PORT || port);
