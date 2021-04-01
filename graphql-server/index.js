const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const models = require('./models');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');
const {USERNAME, PASSWORD, DB} = require('./config');

const app = express();
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@mflix.relsz.mongodb.net/${DB}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
  };
app.use(cors(corsOptions));


app.listen(3000, () => {
    console.log('Listeing on port 3000');
})