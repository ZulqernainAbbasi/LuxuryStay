export const createRoom = async (req, res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.userId})
        if(!hotel){
            return res.json({success: false, message: "No Hotel Found"})
        }
    } catch (error) {
        
    }
}

export const getRooms = async (req, res) => {

}

export const getOwnerRooms = async (req, res) => {
    
}

export const toggleRoomAvailibility = async (req, res) => {
    
}