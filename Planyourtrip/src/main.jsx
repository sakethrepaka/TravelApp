import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import CreateTrip from './create-trip/index.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/custom/Header.jsx';
import { Toaster } from "@/components/ui/toaster"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';
const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>
    },{
      path:'/create-trip',
      element:<CreateTrip/>
    },{
      path:'/view-trip/:tripId',
      element:<Viewtrip/>
    }
  ]
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_KEY}>
    <Header/>
    <RouterProvider router={router}/>
    <Toaster/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
