import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets/assets'

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={'/rooms/' + room._id}
      onClick={() => scrollTo(0, 0)}
      className="group w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.hotel.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Best Seller */}
        {index % 2 === 0 && (
          <p className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-white text-gray-800 rounded-full shadow">
            Best Seller
          </p>
        )}

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm">
          <img
            src={assets.starIconFilled}
            alt="rating"
            className="w-4 h-4"
          />
          <span className="text-sm font-medium text-gray-700">4.5</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Hotel Name */}
        <h3 className="text-2xl font-playfair font-semibold text-gray-900 line-clamp-1">
          {room.hotel.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
          <img
            src={assets.locationIcon}
            alt="location"
            className="w-4 h-4"
          />
          <span className="line-clamp-1">
            {room.hotel.address}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Price
            </p>

            <p className="text-3xl font-bold text-gray-900">
              ${room.pricePerNight}
              <span className="text-sm font-normal text-gray-500">
                /night
              </span>
            </p>
          </div>

          <button className="px-5 py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-all duration-300 cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard