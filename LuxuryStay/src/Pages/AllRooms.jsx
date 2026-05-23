import React, { useState } from 'react'
import { assets, roomsDummyData } from '../assets/assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../Components/StarRating'

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onChange(e.target.checked, label)}
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input
                name="sortOption"
                type="radio"
                checked={selected}
                onChange={() => onChange(label)}
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const AllRooms = () => {

    const navigate = useNavigate()
    const [openFilters, setOpenFilters] = useState(false)

    // ✅ Filter states (IMPORTANT FIX)
    const [selectedRooms, setSelectedRooms] = useState([])
    const [selectedPrices, setSelectedPrices] = useState([])
    const [sortBy, setSortBy] = useState("")

    const roomTypes = [
        "Single Bed",
        "Double Bed",
        "Luxury Room",
        "Family Suite"
    ]

    const priceRanges = [
        '3,000 to 6,999',
        '7,000 to 10,999',
        '11,000 to 13,999',
        '14,000 to 19,999',
    ]

    const sortOptions = [
        'Price Low to High',
        'Price High to Low',
        'Newest First',
    ]

    // checkbox handler
    const handleRoomType = (checked, label) => {
        if (checked) {
            setSelectedRooms([...selectedRooms, label])
        } else {
            setSelectedRooms(selectedRooms.filter(item => item !== label))
        }
    }

    const handlePrice = (checked, label) => {
        if (checked) {
            setSelectedPrices([...selectedPrices, label])
        } else {
            setSelectedPrices(selectedPrices.filter(item => item !== label))
        }
    }

    return (
        <div className='flex flex-col lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 gap-10'>

            {/* LEFT SIDE */}
            <div className='w-full lg:w-2/3'>

                <div className='flex flex-col items-start text-left mb-10'>
                    <h1 className='font-playfair text-4xl md:text-[40px] text-gray-800'>
                        Hotel Rooms
                    </h1>

                    <p className='text-sm md:text-base text-gray-500 mt-2 max-w-2xl'>
                        Take advantage of our limited-time offers and special packages
                        to enhance your stay and create unforgettable memories.
                    </p>
                </div>

                {/* ROOMS */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

                    {roomsDummyData.map((room) => (
                        <div
                            key={room._id}
                            className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300'
                        >

                            <img
                                onClick={() => {
                                    navigate(`/rooms/${room._id}`)
                                    scrollTo(0, 0)
                                }}
                                src={room.images[0]}
                                alt={room.hotel.name}
                                className='h-64 w-full object-cover cursor-pointer'
                            />

                            <div className='p-5'>

                                <p className='text-sm text-gray-500 mb-1'>
                                    {room.hotel.city}
                                </p>

                                <h2
                                    onClick={() => {
                                        navigate(`/rooms/${room._id}`)
                                        scrollTo(0, 0)
                                    }}
                                    className='text-xl font-semibold text-gray-800 cursor-pointer hover:text-blue-600'
                                >
                                    {room.hotel.name}
                                </h2>

                                <div className='flex items-center mt-2'>
                                    <StarRating />
                                    <p className='ml-2 text-sm text-gray-500'>
                                        200+ reviews
                                    </p>
                                </div>

                                <div className='flex items-center gap-2 mt-4 text-gray-500'>
                                    <img src={assets.locationIcon} className='w-4 h-4' />
                                    <span className='text-sm'>
                                        {room.hotel.address}
                                    </span>
                                </div>

                                {/* AMENITIES */}
                                <div className='flex flex-wrap gap-2 mt-5'>
                                    {room.amenities?.map((item, index) => (
                                        <span
                                            key={index}
                                            className='text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border'
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FILTERS */}
            <div className='bg-white w-80 border border-gray-300 text-gray-600'>

                <div className='flex items-center justify-between px-5 py-2.5'>
                    <p className='text-base font-medium text-gray-800'>FILTERS</p>

                    <div className='text-xs cursor-pointer'>
                        <span
                            onClick={() => setOpenFilters(!openFilters)}
                            className='lg:hidden cursor-pointer'
                        >
                            {openFilters ? 'HIDE' : 'SHOW'}
                        </span>

                        <span className='hidden lg:block'>CLEAR</span>
                    </div>
                </div>

                <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>

                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Room Type</p>
                        {roomTypes.map((room, index) => (
                            <CheckBox
                                key={index}
                                label={room}
                                selected={selectedRooms.includes(room)}
                                onChange={handleRoomType}
                            />
                        ))}
                    </div>

                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                        {priceRanges.map((range, index) => (
                            <CheckBox
                                key={index}
                                label={`RS ${range}`}
                                selected={selectedPrices.includes(`RS ${range}`)}
                                onChange={handlePrice}
                            />
                        ))}
                    </div>

                    <div className='px-5 pt-5 pb-5'>
                        <p className='font-medium text-gray-800 pb-2'>Sort By</p>
                        {sortOptions.map((option, index) => (
                            <RadioButton
                                key={index}
                                label={option}
                                selected={sortBy === option}
                                onChange={setSortBy}
                            />
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AllRooms