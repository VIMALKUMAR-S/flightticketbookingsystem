import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Filter from '../pages/Filter'
import MyBookings from '../pages/MyBookings'
import AdminView from './AdminView'

const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/filter' element={<Filter />} />
                <Route path='/mybookings' element={<MyBookings />} />
                <Route path='/adminview' element={<AdminView />} />



            </Routes>


        </>
    )
}

export default Router