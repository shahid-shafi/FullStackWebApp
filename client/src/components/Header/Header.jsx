import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div className='px-8 py-4 bg-gray-900 text-slate-200'>
            <div className='flex w-[screen] justify-between'>
                <div>
                    <h1 className='font-bold'>myapp</h1>
                </div>
                <div>
                    <ul className='space-x-4'>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Signup</NavLink>
                        <NavLink to="/forgotPassword">ForgotPassword</NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header