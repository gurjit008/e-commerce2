import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftPenal from "./leftPenal";
import Header from "./header";
function AdminApp() {
  return (
    <>
            <Header/>
        <div className="grid  grid-cols-12 min-h-screen bg-gray-100 pt-24"> 
        <LeftPenal/>
        <Outlet/>

        </div>
    
    </>
  )
}

export default AdminApp