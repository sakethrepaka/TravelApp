import React from 'react'
import { Link } from 'react-router-dom'

const PlaceCard = ({place}) => {
  return (
    <Link target='_blank' to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-110 transition-all cursor-pointer shadow-md'>
        <img src={'/placeholder.jpg'}  className='w-[130px] h-[130px] rounded-xl' />
        <div>
            <h2 className='fon-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-400'>{place.placeDetails}</p>
            <h2 className='fon-bold text-lg'>⏱️{place.spendingTime}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCard