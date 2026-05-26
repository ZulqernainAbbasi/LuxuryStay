import React, { useState } from 'react'
import Title from '../Components/Title'
import { assets, userBookingsDummyData } from '../assets/assets/assets'

const MyBookings = () => {

    const [bookings, setBookings] = useState(userBookingsDummyData)

    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>

            {/* Title Section */}
            <Title
                title={<>My Bookings</>}
                subTitle={
                    <div className="mt-3">
                        Easily manage your past, current, and upcoming hotel reservations
                        in one place. Plan your trips <br />
                        seamlessly with just a few clicks
                    </div>
                }
                align="left"
            />

            {/* Booking Table */}
            <div className='max-w-6xl mt-10 w-full text-gray-800'>

                {/* Table Heading */}
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b
                border-gray-300 font-medium text-base py-4'>

                    <div>Hotels</div>
                    <div>Date & Timings</div>
                    <div>Payment</div>

                </div>

                {/* Booking Items */}
                {bookings.map((booking) => (

                    <div
                        key={booking._id}
                        className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr]
                        gap-6 w-full border-b border-gray-300 py-6'
                    >

                        {/* Hotel Details */}
                        <div className='flex flex-col md:flex-row gap-4'>

                            <img
                                className='w-full md:w-44 h-52 md:h-32 rounded-xl shadow-md object-cover'
                                src={booking.room.images[0]}
                                alt="hotel-img"
                            />

                            <div className='flex flex-col gap-2'>

                                <p className='font-playfair text-2xl'>
                                    {booking.room.name}
                                    <span className='font-inter text-sm text-gray-500 ml-1'>
                                        ({booking.room.roomType})
                                    </span>
                                </p>

                                {/* Address */}
                                <div className='flex items-center gap-2 text-sm text-gray-500'>
                                    <img
                                        className='w-4 h-4'
                                        src={assets.locationIcon}
                                        alt="location icon"
                                    />
                                    <span>{booking.hotel.address}</span>
                                </div>

                                {/* Guests */}
                                <div className='flex items-center gap-2 text-sm text-gray-500'>
                                    <img
                                        className='w-4 h-4'
                                        src={assets.guestsIcon}
                                        alt="guest icon"
                                    />
                                    <span>Guests: {booking.guests}</span>
                                </div>

                                {/* Price */}
                                <p className='text-base font-medium mt-1'>
                                    Total: ${booking.totalPrice}
                                </p>

                            </div>

                        </div>

                        {/* Date & Timings */}
                        <div className='flex flex-col justify-center gap-2 text-sm'>

                            <div>
                                <span className='font-medium'>Check-In:</span>{' '}
                                {booking.checkInDate}
                            </div>

                            <div>
                                <span className='font-medium'>Check-Out:</span>{' '}
                                {booking.checkOutDate}
                            </div>

                            <div>
                                <span className='font-medium'>Booked On:</span>{' '}
                                {booking.bookedAt}
                            </div>

                        </div>

                        {/* Payment Status */}
                        <div className='flex flex-col justify-center items-start md:items-center gap-3'>

                            <p className={`px-4 py-2 rounded-full text-sm font-medium
                                ${booking.isPaid
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                            >
                                {booking.isPaid ? 'Paid' : 'Pending'}
                            </p>
                            
                            {/* <button
                                className='px-5 py-2 rounded-lg border border-gray-300
                                hover:bg-gray-100 transition-all cursor-pointer'
                            >
                                View Details
                            </button> */}

                        </div>

                        {!booking.isPaid && (
                            <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400
                            rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                                Pay Now
                            </button>
                        )}

                    </div>

                ))}

            </div>

        </div>
    )
}

export default MyBookings