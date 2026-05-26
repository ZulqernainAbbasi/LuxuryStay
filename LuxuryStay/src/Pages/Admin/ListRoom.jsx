import React, { useState } from 'react'
import Title from '../../Components/Title'
import { roomsDummyData } from '../../assets/assets/assets'

const ListRoom = () => {

    const [rooms, setRooms] = useState(roomsDummyData)

    // Toggle Availability
    const toggleAvailability = (id) => {

        setRooms(
            rooms.map((room) =>
                room.id === id
                    ? { ...room, isAvailable: !room.isAvailable }
                    : room
            )
        )
    }

    return (

        <div className='w-full'>

            {/* Title */}
            <Title
                align='left'
                font='outfit'
                title={<>Room Listings</>}
                subTitle={
                    <>
                        View, edit, or manage all listed rooms.
                        Keep the information up-to-date to provide
                        the best experience for users.
                    </>
                }
            />

            {/* Table Section */}
            <div className='mt-8'>

                <p className='text-gray-700 font-medium mb-3'>
                    All Rooms
                </p>

                <div className='overflow-x-auto border border-gray-200 rounded-xl'>

                    <table className='w-full text-sm text-left border-collapse'>

                        {/* Table Head */}
                        <thead className='bg-gray-50 text-gray-700'>

                            <tr>

                                <th className='px-6 py-4 font-medium'>
                                    Name
                                </th>

                                <th className='px-6 py-4 font-medium'>
                                    Facility
                                </th>

                                <th className='px-6 py-4 font-medium'>
                                    Price / night
                                </th>

                                <th className='px-6 py-4 font-medium'>
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        {/* Table Body */}
                        <tbody>

                            {rooms.map((room) => (

                                <tr
                                    key={room.id}
                                    className='border-t border-gray-200 hover:bg-gray-50 transition'
                                >

                                    {/* Room Name */}
                                    <td className='px-6 py-4 text-gray-700'>
                                        {room.roomType}
                                    </td>

                                    {/* Amenities */}
                                    <td className='px-6 py-4 text-gray-500'>
                                        {room.amenities}
                                    </td>

                                    {/* Price */}
                                    <td className='px-6 py-4 text-gray-700'>
                                        RS.{room.pricePerNight}
                                    </td>

                                    {/* Toggle */}
                                    <td className='px-6 py-4'>

                                        <button
                                            onClick={() =>
                                                toggleAvailability(room.id)
                                            }
                                            className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300
                                                
                                                ${room.isAvailable
                                                    ? 'bg-blue-600'
                                                    : 'bg-gray-300'
                                                }`}
                                        >

                                            <div
                                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300
                                                    
                                                    ${room.isAvailable
                                                        ? 'translate-x-6'
                                                        : 'translate-x-0'
                                                    }`}
                                            />

                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default ListRoom