import React from 'react'
import { FaPhone, FaEdit } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import AuthContext from '../../store/auth-context'

const CurrentUser = () => {

    return (
        <AuthContext.Consumer>
            {({ isLoggedIn, currentUser, setLoggedIn }) => (
                <div className='flex justify-center items-center bg-slate-300 h-full w-full p-20'>
                    <div className='relative'>
                        <Link to={'/edit-user'} className='absolute my-4 mx-[380px] sm:mx-[418px] text-xl'><FaEdit /></Link>
                        <div className='flex space-x-10 p-12 bg-stone-600 rounded-t-3xl'>
                            <img className='h-36 bg-white rounded-full' src="https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos1607/yupiramos160710322.jpg" alt="" />
                            <div className='mt-12 space-y-1'>
                                <h1 className='text-3xl font-bold text-white'>{currentUser.name}</h1>
                                <h2 className='font-bold text-slate-900'>{currentUser.profession ? currentUser.profession : "Web Developer"}</h2>
                            </div>
                        </div>
                        <div className='flex space-x-10  px-12 bg-stone-400 py-3 rounded-b-3xl'>
                            <div className='space-y-2'>
                                <div className='flex space-x-3'>
                                    <span><FaPhone className='mt-[6px]' /></span>
                                    <span className='flex'><p>+91-</p><p>9906222888</p></span>
                                </div>
                                <div className='flex space-x-3'>
                                    <span><MdEmail className='mt-[6px]' /></span>
                                    <p>{currentUser.email}</p>
                                </div>
                                <div className='flex space-x-3'>
                                    <span>Gender :</span>
                                    <p>{currentUser.gender}</p>
                                </div>

                            </div>
                            {currentUser.hobbies && <div>
                                <h1 className='text-2xl font-bold text-slate-800'>Hobbies</h1>
                                <ul className='ml-8'>
                                    {currentUser.hobbies.map(hobby => <li key={hobby} className='list-disc'>{hobby}</li>)}
                                </ul>
                            </div>}
                        </div>
                    </div>
                </div>)
            }
        </AuthContext.Consumer >
    )
}

export default CurrentUser