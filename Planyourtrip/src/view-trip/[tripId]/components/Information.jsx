import { Button } from '@/components/ui/button'
import React from 'react'
import  {IoIosSend} from 'react-icons/io'

const Information = ({ data, userdata }) => {
    console.log(userdata, "data")
    return (
        <div>
            <img className='h-[340px] w-full object-cover rounded' src='/placeholder.jpg'></img>

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{userdata?.place}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🗓️{userdata?.days} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💵{userdata?.budgetType} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>👪No of travelers: {userdata?.travelType}</h2>

                    </div>
                </div>
                <Button><IoIosSend/></Button>
            </div>
        </div>
    )
}

export default Information