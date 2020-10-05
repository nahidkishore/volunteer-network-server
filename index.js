    const express = require('express')
    const app = express()
    const MongoClient = require('mongodb').MongoClient;
    require('dotenv').config()
    const port=7000
  




    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
    client.connect(err => {
      const collection = client.db("test").collection("devices");
    console.log('database connected');
      client.close();
    });


    app.get('/', function (req, res) {
      res.send('hello world')
    })


    app.listen(port)