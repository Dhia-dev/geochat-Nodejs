const mongoose = require('mongoose')
  
  var express = require('express')
  const url = "mongodb+srv://ala:172839654@cluster0.ia5kj.mongodb.net/?retryWrites=true&w=majority";
  
  const connectionParams={
      useNewUrlParser: true,
      useUnifiedTopology: true 
  }
  mongoose.connect(url,connectionParams)
      .then( () => {
          console.log('Connected to the database ')
      })
      .catch( (err) => {
          console.error(`Error connnecting the tha data base. n${err} `);
      })


      const URI = process.env.MONGODB_URL;