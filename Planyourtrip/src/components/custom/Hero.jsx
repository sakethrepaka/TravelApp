import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='flex flex-col items-center mx-56 gap-9 '>
            <h1 className='font-extrabold text-[55px] text-gray-500 mt-16'>Explore adventures across the world with an Itenary<br></br> <span className='text-black'>Powered by AI</span></h1>

            <p className='text-xl text-gray-500 text-center'>Your personal travel planer creating tailored itineraies that are in line with your interests and budget</p>
            <Link to={'/create-trip'}>
                <Button>Get Started</Button>
            </Link>
        </div>
    )
}

export default Hero