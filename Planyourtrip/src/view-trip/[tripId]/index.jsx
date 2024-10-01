import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/Firebaseconfig'; // Adjust import path as necessary
import Information from './components/Information';
import Hotels from './components/Hotels';
import PlacestoVisit from './components/PlacestoVisit';

const Viewtrip = () => {
    const { tripId } = useParams();
    const [tripData, setTripData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTripData = async () => {
            try {
                const tripDocRef = doc(db, 'Aitrip', tripId);
                const docSnap = await getDoc(tripDocRef);

                if (docSnap.exists()) {
                    setTripData(docSnap.data());
                    console.log(docSnap.data())
                } else {
                    setError('No such document!');
                }
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTripData();
    }, [tripId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const { tripData: data, userselection } = tripData;



    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <Information data={data} userdata={userselection}/>
            <Hotels data={data}/>
            <PlacestoVisit data={data}/>
        </div>
    );
};

export default Viewtrip;
