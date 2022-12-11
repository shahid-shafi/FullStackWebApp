import React, { useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

function Header() {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    const logoutHandler = () => {
        localStorage.removeItem("jwt")
        authContext.setIsLoggedIn(false)
        navigate('/login')
    }

    return (
        <div className='px-8 py-4 bg-gray-900 text-slate-200'>
            <div className='flex w-[screen] justify-between'>
                <div>
                    <h1 className='font-bold'>myapp</h1>
                </div>
                <div>
                    <AuthContext.Consumer>
                        {({ isLoggedIn, currentUser, setLoggedIn }) => (
                            <ul className='space-x-4'>
                                <NavLink to="/">Home</NavLink>

                                {!isLoggedIn && <>
                                    <NavLink to="/login">Login</NavLink>
                                    <NavLink to="/signup">Signup</NavLink>
                                </>}
                                
                                {isLoggedIn && <>
                                    <NavLink to="/user">User</NavLink>
                                    <NavLink to="/forgotPassword">ForgotPassword</NavLink>
                                    <button onClick={logoutHandler}>Logout</button>
                                </>}
                            </ul>
                        )}
                    </AuthContext.Consumer>
                </div>
            </div>
        </div>
    )
}

export default Header