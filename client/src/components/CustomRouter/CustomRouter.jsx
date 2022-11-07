import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from '../Form/Login'
import Home from '../Pages/Home'
import Signup from '../Form/Signup'
import PasswordReset from '../Form/PasswordReset'
import ForgotPassword from '../Form/ForgotPassword'

const CustomRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/resetPassword/:token' element={<PasswordReset />} />
        </Routes>
    )
}

export default CustomRouter