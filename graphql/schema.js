var { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Query {
        list_hotels: [Hotel]
        search_hotel(hotel_name: String, city: String): [Hotel]
        list_bookings: [Booking]
        list_users: [User]
    },
    type Mutation {
        create_hotel(hotel_id: Int!, hotel_name: String!, street:String, city: String, postal_code: String, price: Float, email: String): Hotel
        create_booking(hotel_id: Int!, user_id: Int!, booking_start: String, booking_end: String): Booking
        create_profile(username: String!, password: String!, email: String!): User
    },
    type Hotel {
        hotel_id: Int
        hotel_name: String
        street: String
        city: String
        postal_code: String
        price: Float
        email: String   
    },
    type Booking {
        hotel_id: Int
        booking_date: String
        booking_start: String
        booking_end: String
        user_id: Int
    },
    type User {
        username: String!
        password: String!
        email: String!
    }
`);