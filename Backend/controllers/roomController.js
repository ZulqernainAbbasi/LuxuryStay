import { response } from "express";
import Hotel from "../models/hotel.js";
import {v2 as cloudinary} from 'cloudinary';
import Room from "../models/Room.js";
import path from "path";

export const createRoom = async (req, res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.userId})
        if(!hotel){
            return res.json({success: false, message: "No Hotel Found"})
        }

        const uploadImages = req.files.map(async(file) =>{
            await cloudinary.uploader.upload(file.upload);
            return response.secure_url;
        })

        await Promise.all(uploadImages)

        await Room.Create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        })
        res.json({success: true, message: "Room created Successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({isAvailable: true}).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({createdAt : -1})
        res.json({success: true, rooms});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel({owner: req.auth.userId})
        const rooms = await Room.find({Hotel: hotelData._id.toString}).populate('Hotel');
        res.json({success: true,rooms})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const toggleRoomAvailibility = async (req, res) => {
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success: true, message: "Room Availibility Updated"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}