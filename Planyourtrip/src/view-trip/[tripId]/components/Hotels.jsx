import React from 'react'
import { Link } from 'react-router-dom'

const Hotels = ({data}) => {
  console.log(data,"hotel")
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {
          data?.Hotels?.map((item,index)=>(
            <Link target='_blank' to={`https://www.google.com/maps/search/?api=1&query=${item.hotelName}+${item.hotelAddress}`}>
            <div className='hover:scale-110 transition-all cursor-pointer'>
              <img src='/placeholder.jpg' className='rounded-xl'></img>
              <div className='my-3 flex flex-col gap-2'>
                <h2 className='font-medium'>{item.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>{item.hotelAddress}</h2>
                <h2 className='text-sm'>💵{item.price}</h2>
                <h2 className='text-sm'>⭐{item.rating}</h2>
              </div>
            </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Hotels