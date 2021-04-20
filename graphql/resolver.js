const Booking = require('../models/Booking')
const User = require('../models/User')
const Hotel = require('../models/Hotel')

//wrap some methods in a promise in order to get the correct response
function wrapFunction(func, args) {
    return new Promise((resolve, reject) => {
        func(args, (success) => resolve(success), (error) => reject(error))
    })
}


const createHotel = async (args) => {
    try{
        const result = await wrapFunction(addHotelToDb, args)
        return result
    }
    catch(err){
        console.log(err)
    }
}

//helper function to be wrapped in wrapFunction
function addHotelToDb(args, onSuccess, onError){
    const hotel = new Hotel(args)
    hotel.save((err, success) => {
        if (err){
            console.log(err)
            onError(err)
        }
        else {
            console.log(success)
            onSuccess(success)
        }
    })
}

const listAllHotels = async () => {
     //lean() causes mongoose to return json instead of instance of query class
    const hotelList = await Hotel.find({}).lean()
    return hotelList
}


const bookHotel = async (args) => {
    try {
        const result = await wrapFunction(addBookingToDb, args)
        return result
    }
    catch (err) {
        console.log(err)
    }
}

//helper function to be wrapped in wrapFunction
function addBookingToDb(args, onSuccess, onError){
    let d = new Date()
    args.booking_date = d.getDate() +'-'+ (d.getMonth()+1)+'-'+ d.getFullYear()
    
    const booking = new Booking(args)
    booking.save((err, success) => {
        if (err) {
            console.log(err)
            onError(err)
        }
        else {
            console.log(success)
            onSuccess(success)
        }
    })
}


const searchHotel = async (args) => {
    const hotelList = await Hotel.find(args).lean()
    return hotelList
}

const listAllBookings = async () => {
    const bookingsList = await Booking.find({}).lean()
    return bookingsList
}

const createUserProfile = async (args) => {
    try {
        const result = await wrapFunction(addUserToDb, args)
        return result
    }
    catch (err) {
        console.log(err)
    }
}

function addUserToDb(args, onSuccess, onError){
    const user = new User(args)
    user.save((err, success) => {
        if (err) {
            console.log(err)
            onError(err)
        }
        else {
            console.log("Created a user")
            onSuccess(success)
        }
    })
}

module.exports = {
    createHotel,
    listAllHotels,
    bookHotel,
    searchHotel,
    listAllBookings,
    createUserProfile
}