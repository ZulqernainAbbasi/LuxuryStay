import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import AllRooms from "./Pages/AllRooms";
import RoomDetails from "./Pages/RoomDetails";
import MyBookings from "./Pages/MyBookings";
import HotelReg from "./Components/HotelReg";
import Layout from "./Pages/Admin/Layout";
import Dashboard from "./Pages/Admin/Dashboard";
import AddRoom from "./Pages/Admin/AddRoom";
import ListRoom from "./Pages/Admin/ListRoom";
import Staff from "./Pages/Admin/Staff";

const App = () => {

  const location = useLocation();
  const isOwnerPath = location.pathname.includes("admin");
  const [showHotelReg, setShowHotelReg] = useState(false);
  return (
    <div>
      {/* Navbar */}
      {!isOwnerPath && (
        <Navbar setShowHotelReg={setShowHotelReg} />
      )}
      {/* Hotel Registration Modal */}
      {showHotelReg && (
        <HotelReg setShowHotelReg={setShowHotelReg} />
      )}
      {/* Main Content */}
      <div className='min-h-[70vh]'>
        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/rooms' element={<AllRooms />} />

          <Route path='/rooms/:id' element={<RoomDetails />} />

          <Route path='/my-bookings' element={<MyBookings />} />

          {/* Admin Layout */}
          <Route path="/admin/*" element={<Layout />}>
            <Route index element={<Dashboard/>}/>
            <Route path="add-room" element={<AddRoom/>}/>
            <Route path="list-room" element={<ListRoom/>}/> 
            <Route path="staff" element={<Staff/>}/> 
          </Route>
        </Routes>
      </div>

      {/* Footer */}
      {!isOwnerPath && <Footer />}

    </div>
  );
};

export default App;