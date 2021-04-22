const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const gqlSchema = require('./graphql/schema')
const mongoose = require('mongoose')
const gqlResolver = require('./graphql/resolver')

const cors = require('cors')
const bodyParser = require('body-parser')

const DB_URL = 'mongodb+srv://barri:test@cluster0.rpou1.mongodb.net/Hotel_System?retryWrites=true&w=majority'

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log("Successfully connected to the database mongoDB Atlas Server")
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err)
        process.exit()
    })

//Declare Resolver
var root = {
    create_hotel: gqlResolver.createHotel, //mutation
    list_hotels: gqlResolver.listAllHotels, //query
    create_booking: gqlResolver.bookHotel, //mutation
    search_hotel: gqlResolver.searchHotel, //query
    list_bookings: gqlResolver.listAllBookings, //query
    create_profile: gqlResolver.createUserProfile, //mutation
    list_users: gqlResolver.listAllUsers
    //TODO: add method to check username and password
};

var app = express();

//app.use(bodyParser.json())
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: gqlSchema,     //Set schema
    rootValue: root,    //Set resolver
    graphiql: true      //Client access
}));

app.listen(4002, () => {
    console.log('Express GraphQL Server Now Running On http://localhost:4002/graphql')
});