const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//import ApolloServer
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const movie = require('./models/Movie')



//Store sensitive information to env variables
const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
const DB_CONNECTION = process.env.MONGODB_URL;
const PORT = process.env.PORT || 4000

//TODO - Replace you Connection String here
const connectDB = async() => {

    try{
      mongoose.connect(DB_CONNECTION) 
      
      .then(()=> {

        console.log('Success Mongodb connection')

      }).catch(err => {

        console.log('Error Mongodb connection', err.message)

      });

    } catch(error) {

        console.log(`Unable to connect to DB : ${error.message}`);

      }
  }

//Define Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers })

//Define Express Server
const app = express();
app.use(express.json());
app.use('*', cors());

//Add Express app as middleware to Apollo Server
async function startApolloServer(){
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.listen(PORT, () => {
    console.log(`---SERVER STARTED: http://localhost:${PORT}${apolloServer.graphqlPath}`)
    connectDB();

  });

}

startApolloServer();

