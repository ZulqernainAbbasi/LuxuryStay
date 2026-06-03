import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/hotel.js"

const checkAvailibilty = async ({checkInDate, checkOutDate, room})=>{
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        });

        const isAvailible = bookings.length === 0;
        return isAvailible;
    } catch (error) {
        console.error(error.message);
    }
}

export const checkAvailibiltyAPI = async(req,res) =>{
    try {
        const {room, checkInDate, checkOutDate} = req.body;
        const isAvailible = await checkAvailibilty({checkInDate,checkOutDate,room});
        res.json({success: true, isAvailible})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const createBooking = async(req,res) =>{
    try {
        const {room, checkInDate, checkOutDate, guests} = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailibilty({
            checkInDate,
            checkOutDate,
            room
        });

        if(!isAvailable){
            return res.json({success: false, message: 'Room is not availible'});
        }

        const roomData = await Room.findById(room).populate('hotel');
        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000*3600*24));
        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            gusets: +guests,
            checkInDate,
            checkOutdate,
            totalPrice
        })

        res.json({success: true, message: 'Booking created successfully'})

    } catch (error) {
        res.json({success: false, message: 'Failed to Create Booking'})
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt: -1});
        res.json({success: true, bookings});
    } catch (error) {
        res.json({success: false, message: "Failed to fetch Bookings"});
    }
}

export const getHotelBookings = async (req, res) =>{
    try{
        const hotel = await Hotel.findOne({owner: req.auth.userId});
        if(!hotel){
            return res.json({success: false, message: "No Hotel Found"});
        }
        const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({createdAt: -1});

        const totalBookings = bookings.length;

        const totalRevenue = bookings.reduce((acc, booking) => + booking.totalPrice,0);
        res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}})
    }catch(error){
        res.json({success: false, message: "Failed to fetch bookings"})
    }
}