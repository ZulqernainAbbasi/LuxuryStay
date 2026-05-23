import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets/assets.js'

const Testimonial = () => {

    const columns = [
        { start: 0, end: 1, className: "animate-scroll-up-1" },
        { start: 1, end: 2, className: "hidden md:block animate-scroll-up-2" },
        { start: 2, end: 3, className: "hidden lg:block animate-scroll-up-3" }
    ]

    const renderStars = (rating) => {
        return [...Array(rating)].map((_, index) => (
            <span key={index} className="text-yellow-500 text-sm">★</span>
        ))
    }

    const renderCard = (testimonial, index) => (
        <div
            key={`${testimonial.id}`}
            className="bg-white border border-gray-200 rounded-xl p-6 mb-4 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
        >

            <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial.rating)}
            </div>

            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                {testimonial.review}
            </p>

            <div className="flex items-center gap-3">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="size-11 rounded-full border border-gray-300 object-cover"
                />

                <div>
                    <p className="text-sm text-gray-800 font-medium">
                        {testimonial.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {testimonial.address}
                    </p>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

                    *{
                        font-family: "Geist", sans-serif;
                    }

                    @keyframes scroll-up {
                        0% {
                            transform: translateY(0);
                        }
                        100% {
                            transform: translateY(-50%);
                        }
                    }

                    .animate-scroll-up-1 {
                        animation: scroll-up 25s linear infinite;
                    }

                    .animate-scroll-up-2 {
                        animation: scroll-up 30s linear infinite;
                    }

                    .animate-scroll-up-3 {
                        animation: scroll-up 20s linear infinite;
                    }
                `}
            </style>

            <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-gray-100 pt-20 pb-30'>

                <Title
                    title="What Our Guests Say"
                    subTitle={
                        <>
                            Discover why discerning travelers consistently choose QuickStay
                            for their exclusive and luxurious
                            <br />
                            accommodations around the world.
                        </>
                    }
                />

                <div className="relative w-full max-w-6xl overflow-hidden mt-16">

                    <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-gray-100 to-transparent z-10 pointer-events-none"></div>

                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-100 to-transparent z-10 pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[600px] overflow-hidden">

                        {columns.map((col, colIndex) => (
                            <div key={colIndex} className={col.className}>

                                {[
                                    ...testimonials.slice(col.start, col.end),
                                    ...testimonials.slice(col.start, col.end)
                                ].map((testimonial, index) =>
                                    renderCard(testimonial, index)
                                )}

                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonial