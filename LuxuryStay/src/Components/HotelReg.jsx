import React from 'react'
import { assets, cities } from '../assets/assets/assets'

const HotelReg = ({ setShowHotelReg }) => {

    const handleSubmit = (e) => {
        e.preventDefault()

        // Add your registration logic here
        console.log("Hotel Registered")
    }

    return (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4'>

            <form
                onSubmit={handleSubmit}
                className='flex bg-white rounded-2xl overflow-hidden max-w-4xl w-full'
            >

                {/* Left Image */}
                <img
                    src={assets.regImage}
                    alt="reg-image"
                    className='w-1/2 object-cover hidden md:block'
                />

                {/* Right Form */}
                <div className='relative flex flex-col md:w-1/2 p-8 md:p-10 w-full'>

                    {/* Close Button */}
                    <img
                        onClick={() => setShowHotelReg(false)}
                        src={assets.closeIcon}
                        alt="close-icon"
                        className='absolute top-5 right-5 h-4 w-4 cursor-pointer'
                    />

                    <h2 className='text-2xl font-semibold text-gray-800 mt-4'>
                        Register Your Hotel
                    </h2>

                    {/* Hotel Name */}
                    <div className='w-full mt-5'>
                        <label
                            htmlFor="name"
                            className='font-medium text-gray-600'
                        >
                            Hotel Name
                        </label>

                        <input
                            id='name'
                            type="text"
                            placeholder='Type here'
                            className='border border-gray-300 rounded-lg w-full px-3 py-2.5 mt-1 outline-none focus:border-indigo-500'
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className='w-full mt-4'>
                        <label
                            htmlFor="contact"
                            className='font-medium text-gray-600'
                        >
                            Phone
                        </label>

                        <input
                            id='contact'
                            type="text"
                            placeholder='Type here'
                            className='border border-gray-300 rounded-lg w-full px-3 py-2.5 mt-1 outline-none focus:border-indigo-500'
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className='w-full mt-4'>
                        <label
                            htmlFor="address"
                            className='font-medium text-gray-600'
                        >
                            Address
                        </label>

                        <input
                            id='address'
                            type="text"
                            placeholder='Type here'
                            className='border border-gray-300 rounded-lg w-full px-3 py-2.5 mt-1 outline-none focus:border-indigo-500'
                            required
                        />
                    </div>

                    {/* City */}
                    <div className='w-full mt-4'>
                        <label
                            htmlFor="city"
                            className='font-medium text-gray-600'
                        >
                            City
                        </label>

                        <select
                            id="city"
                            className='border border-gray-300 rounded-lg w-full px-3 py-2.5 mt-1 outline-none focus:border-indigo-500'
                            required
                        >
                            <option value="">Select City</option>

                            {cities.map((city) => (
                                <option value={city} key={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Button */}
                    <button
                        type='submit'
                        className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white px-6 py-3 rounded-lg cursor-pointer mt-6 w-full'
                    >
                        Register
                    </button>

                </div>
            </form>
        </div>
    )
}

export default HotelReg