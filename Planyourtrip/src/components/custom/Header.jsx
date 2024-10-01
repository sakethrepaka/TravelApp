import React, { useEffect,useState } from 'react'
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google'
import { useNavigation } from 'react-router-dom'
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
import axios from 'axios'


const Header = () => {

    const userdata = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState(userdata?userdata:null)
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
            setUser(user)
        })
    }

    useEffect(() => {

    }, [])

    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-5'>
            <img src='/logo.svg'></img>
            <div>
                {
                    user ?
                        <div className='flex items-center gap-3'>
                            <Button variant='outline' className='rounded-full'>My Trips</Button>
                            <Popover>
                                <PopoverTrigger className='bg-white'>
                                    <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <h2 className='cursor-pointer' onClick={() => {
                                        googleLogout();
                                        localStorage.clear()
                                        window.location.reload()
                                    }}>Logout</h2>
                                </PopoverContent>
                            </Popover>

                        </div>
                        :
                        <Button onClick={login}>Sign In</Button>

                }
            </div>
        </div>
    )
}

export default Header