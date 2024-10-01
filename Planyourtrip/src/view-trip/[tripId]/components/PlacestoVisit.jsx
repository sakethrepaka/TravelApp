import React from 'react'
import PlaceCard from './PlaceCard'

const PlacestoVisit = ({ data }) => {
    console.log(data,"data")
    return (
        <div>
            <h2 className='font-bold text-lg'>Places to Visit</h2>
            <div>
                {
                    data.Itinerary?.map((item, index) => (
                        <div className='mt-5' >
                            <h2 className='font-medium text-lg'>{item.day}</h2>
                            <div className='grid md:grid-cols-2 gap-5'>
                                {
                                    item.places.map((place, index) => {
                                        return (<div>
                                            <h2 className='font-medium text-sm text-orange-500'>{place.timeToVisit}</h2>
                                            <PlaceCard place={place} />
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PlacestoVisit