import React, { useState } from 'react'
import Title from '../../Components/Title'
import { assets } from '../../assets/assets/assets'

const AddRoom = () => {

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    })

    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: '',
        amenities: {
            'Free WiFi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false
        }
    })

    // Handle Input Change
    const handleAmenityChange = (amenity) => {
        setInputs({
            ...inputs,
            amenities: {
                ...inputs.amenities,
                [amenity]: !inputs.amenities[amenity]
            }
        })
    }

    // Form Submit
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(inputs)
        console.log(images)
    }

    return (

        <form
            onSubmit={handleSubmit}
            className='max-w-4xl'
        >

            <Title
                align='left'
                font='outfit'
                title={<>Add Room</>}
                subTitle={
                    <>
                        Fill in the details carefully and provide accurate
                        room details, pricing, and amenities to enhance
                        the user booking experience.
                    </>
                }
            />

            {/* Upload Images */}
            <p className='text-gray-800 mt-10 font-medium'>
                Images
            </p>

            <div className='grid grid-cols-2 sm:flex gap-4 my-3 flex-wrap'>

                {Object.keys(images).map((key) => (

                    <label
                        key={key}
                        htmlFor={`roomImage${key}`}
                    >

                        <img
                            className='h-24 w-24 object-cover rounded-lg cursor-pointer border border-gray-300 opacity-80 hover:opacity-100 transition'
                            src={
                                images[key]
                                    ? URL.createObjectURL(images[key])
                                    : assets.uploadArea
                            }
                            alt=""
                        />

                        <input
                            type="file"
                            accept='image/*'
                            id={`roomImage${key}`}
                            hidden
                            onChange={(e) =>
                                setImages({
                                    ...images,
                                    [key]: e.target.files[0]
                                })
                            }
                        />

                    </label>
                ))}

            </div>

            {/* Room Type */}
            <div className='mt-6'>

                <label className='text-gray-800 font-medium'>
                    Room Type
                </label>

                <input
                    type="text"
                    placeholder='Enter room type'
                    value={inputs.roomType}
                    onChange={(e) =>
                        setInputs({
                            ...inputs,
                            roomType: e.target.value
                        })
                    }
                    className='w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500'
                    required
                />

            </div>

            {/* Price */}
            <div className='mt-6'>

                <label className='text-gray-800 font-medium'>
                    Price Per Night
                </label>

                <input
                    type="number"
                    placeholder='Enter price'
                    value={inputs.pricePerNight}
                    onChange={(e) =>
                        setInputs({
                            ...inputs,
                            pricePerNight: e.target.value
                        })
                    }
                    className='w-full border border-gray-300 rounded-lg px-4 py-3 mt-2 outline-none focus:border-blue-500'
                    required
                />

            </div>

            {/* Amenities */}
            <div className='mt-6'>

                <p className='text-gray-800 font-medium mb-3'>
                    Amenities
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>

                    {Object.keys(inputs.amenities).map((amenity) => (

                        <label
                            key={amenity}
                            className='flex items-center gap-3'
                        >

                            <input
                                type="checkbox"
                                checked={inputs.amenities[amenity]}
                                onChange={() =>
                                    handleAmenityChange(amenity)
                                }
                            />

                            <span>{amenity}</span>

                        </label>
                    ))}

                </div>

            </div>

            {/* Submit Button */}
            <button
                type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg mt-8 transition'
            >
                Add Room
            </button>

        </form>
    )
}

export default AddRoom