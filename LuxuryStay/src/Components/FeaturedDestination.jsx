import React from 'react'
import { roomsDummyData } from '../assets/assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const FeaturedDestination = () => {

    const navigate = useNavigate();

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-10 bg-gray-100" >
      
      <Title
        className="py-3"
        title="Featured Destination"
        subTitle={
            <>
            Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury <br />
            and unforgettable experiences.
            </>
        }      
  />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {roomsDummyData.map((room, index) => (
          <HotelCard
            key={room._id}
            room={room}
            index={index}
          />
        ))}
      </div>

            {/* Button */}
        <div className="flex justify-center my-16">
        <button
            onClick={() => {
            navigate('/rooms');
            scrollTo(0, 0);
            }}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
        >
            View All Destinations
        </button>
        </div>

    </div>
  )
}

export default FeaturedDestination