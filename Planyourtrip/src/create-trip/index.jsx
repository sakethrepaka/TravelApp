import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import { AI_PROMPT } from '@/constants/options';
import { ChatSession } from '@google/generative-ai';
import { chatSession } from '@/service/AIModal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google';
import { setDoc, doc } from 'firebase/firestore';
import { db, app } from '@/service/Firebaseconfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from 'react-router-dom';



const CreateTrip = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [days, setDays] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const searchCache = useRef({});
    const [openDialog, setOpenDialog] = useState(false)
    const [formData, setFormData] = useState({
        place: '',
        days: '',
        travelType: '',
        budgetType: '',
    });
    const navigate = useNavigate()

    const { toast } = useToast()
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const fetchSearchResults = async (searchQuery) => {
        if (searchCache.current[searchQuery]) {
            setSearchResults(searchCache.current[searchQuery]);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.get('https://map-places.p.rapidapi.com/autocomplete/json', {
                params: {
                    input: searchQuery,
                    radius: '50000',
                    language: 'en',
                    location: 'India',
                    locationbias: 'India',
                },
                headers: {
                    'X-RapidAPI-Key': 'bdff66d5bfmsha6b120b80df685dp19edd1jsnd5e8f666557b',
                    'X-RapidAPI-Host': 'map-places.p.rapidapi.com',
                },
            });
            const predictions = response.data.predictions;
            setSearchResults(predictions);
            searchCache.current[searchQuery] = predictions; // Store the results in cache
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedSearch = useRef(debounce(fetchSearchResults, 300)).current; // Debounced version of fetchSearchResults

    const handleSearch = (query) => {
        setSearchTerm(query);
        if (query) {
            debouncedSearch(query);
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectLocation = (location) => {
        setSelectedLocation(location);
        setSearchTerm(location.description); // Set the selected location in the input
        setSearchResults([]); // Hide the dropdown after selection
    };

    const handleSelectTravel = (travel) => {
        setSelectedTravel(travel);
    };

    const handleSelectBudget = (budget) => {
        setSelectedBudget(budget);
    };

    const login = useGoogleLogin({
        onSuccess: (coderesp) => GetUserProfile(coderesp),
        onError: (error) => console.log(error)
    })

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((res) => {
            console.log(res)
            localStorage.setItem('user', JSON.stringify(res.data))
            setOpenDialog(false)
            handleSubmit()
        })
    }

    const TripData = async (TripData,data) => {
        const docID = Date.now().toString();  // Generate docID here
        const user = JSON.parse(localStorage.getItem('user'));
        setFormData(data)
    
        await setDoc(doc(db, "Aitrip", docID), {
            tripData: JSON.parse(TripData),
            userselection: data,
            userEmail: user?.email,
            id: docID
        });
    
        return docID;  // Return the docID
    };
    

    const handleSubmit = async () => {
        const user = localStorage.getItem('user');
    
        if (!user) {
            setOpenDialog(true);
            return;
        }
    
        if (!selectedLocation || !selectedTravel || !selectedBudget || !days || days > 7) {
            toast({ title: 'Error', description: 'Please fill out all fields and ensure days are within the limit of 7.' });
            return;
        }
    
        const newFormData = {
            place: selectedLocation.description,
            days: days,
            travelType: selectedTravel.title,
            budgetType: selectedBudget.title,
        };
    
    
        const FINAL_PROMPT = AI_PROMPT.replace('{location}', newFormData.place)
            .replace('{totalDays}', newFormData.days)
            .replace('{traveler}', newFormData.travelType)
            .replace('{budget}', newFormData.budgetType);
    
        setIsLoading(true);
        try {
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            console.log(result?.response.text());
    
            const docID = await TripData(result?.response.text(),newFormData);
    
            
            navigate('/view-trip/' + docID);
        } catch (error) {
            console.error('Error generating trip:', error);
        } finally {
            setIsLoading(false);
        }
    };
    



    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🚞🌅</h2>
            <p className="mt-3 text-gray-500 text-xl">Let's go through with some required info</p>

            <div className="mt-20 flex flex-col gap-9 mb-10">
                <div>
                    <h2 className="text-xl my-3 font-medium">Enter your destination of choice</h2>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="border border-gray-300 p-3 w-full rounded"
                            placeholder="Search destination..."
                        />

                        {searchTerm && searchResults.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-2 rounded shadow-lg max-h-60 overflow-auto">
                                {searchResults.map((item) => (
                                    <li
                                        key={item.place_id}
                                        onClick={() => handleSelectLocation(item)}
                                        className="cursor-pointer hover:bg-gray-100 p-3"
                                    >
                                        {item.description}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {isLoading && <p>Loading...</p>}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl my-3 font-medium">How many days are you planning your trip</h2>
                    <Input
                        placeholder={'Ex.6'}
                        type='number'
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                    />
                </div>

                {/* Travel Options Section */}
                <div>
                    <h2 className="text-xl my-3 font-medium">Select your travel type</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {SelectTravelsList.map(option => (
                            <div
                                key={option.id}
                                onClick={() => handleSelectTravel(option)}
                                className={`border border-gray-300 p-4 rounded-lg shadow-md flex items-center cursor-pointer ${selectedTravel?.id === option.id ? 'bg-gray-100' : ''}`}
                            >
                                <span className="text-3xl mr-4">{option.icon}</span>
                                <div>
                                    <h3 className="text-lg font-semibold">{option.title}</h3>
                                    <p className="text-gray-600">{option.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Budget Options Section */}
                <div>
                    <h2 className="text-xl my-3 font-medium">Select your budget type</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {SelectBudgetOptions.map(option => (
                            <div
                                key={option.id}
                                onClick={() => handleSelectBudget(option)}
                                className={`border border-gray-300 p-4 rounded-lg shadow-md flex items-center cursor-pointer ${selectedBudget?.id === option.id ? 'bg-gray-100' : ''}`}
                            >
                                <span className="text-3xl mr-4">{option.icon}</span>
                                <div>
                                    <h3 className="text-lg font-semibold">{option.title}</h3>
                                    <p className="text-gray-600">{option.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='my-10 flex justify-end'>
                <Button disable={isLoading} onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> : "Generate Trip"}
                </Button>

            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src='./logo.svg'></img>
                            <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
                            <p>Just sign in to get ready for your trip plan</p>
                            <Button onClick={login} className='w-full mt-5 flex gap-4 items-center'><FcGoogle className='h-7 w-7' />Sign in with Google</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default CreateTrip;
