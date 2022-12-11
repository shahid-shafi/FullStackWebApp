import React, { useContext } from 'react'
import { Routes, Route, } from 'react-router-dom'
import { Login } from '../Form/Login'
import Home from '../Pages/Home'
import Signup from '../Form/Signup'
import PasswordReset from '../Form/PasswordReset'
import ForgotPassword from '../Form/ForgotPassword'
import CurrentUser from '../Pages/CurrentUser'
import EditUser from '../Pages/EditUser'
import AuthContext from '../../store/auth-context'

const CustomRouter = () => {
    const { isLoggedIn } = useContext(AuthContext)
    console.log(isLoggedIn)
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />

            {isLoggedIn && <>
                <Route exact path='/user' element={<CurrentUser />} />
                <Route exact path='/edit-user' element={<EditUser />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
            </>}
            <Route path='/resetPassword/:token' element={<PasswordReset />} />
        </Routes >
    )
}

export default CustomRouter