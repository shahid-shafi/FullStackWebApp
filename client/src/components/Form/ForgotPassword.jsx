import React, { useState } from 'react'
import axios from 'axios';
import Loader from '../Loaders/Loader'

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")

    const submitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/user/forgotPassword',
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email
                }
            })
            console.log(res)
            if (res.statusText === 'OK' || 'Created') {
                // alert(`${res.data.message}`)
                setResponse(res.data.message)
            }
        } catch (error) {
            setResponse(error)
        }
        setLoading(false);
    }

    return (
        <>
            {loading && <Loader />}
            <div className='flex justify-center items-center bg-slate-300 h-full w-full p-20'>
                <form onSubmit={submitEmail} className='flex flex-col px-20 py-20 bg-white rounded-lg'>

                    {response && <h1 className='text-center bg-purple-700 text-white p-3 mb-4 font-semibold rounded-lg'>{response}</h1>}

                    <img className='h-20 m-auto' src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/forgot-password-icon.png" alt="" />

                    <div className='text-2xl text-center font-bold text-purple-700'>
                        <h1 className='mt-4'>FORGOT PASSWORD</h1>
                        <p className='text-sm py-4 text-slate-500'>Enter your email address to retrieve your password!</p>
                    </div>

                    <input onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder='Email' className="leading-none outline-0 h-10 px-2 rounded-md w-80 shadow shadow-slate-400 hover:scale-105" required />
                    <button type='submit' className='bg-purple-700 w-40 h-10 m-auto rounded-md my-4 text-white'>Reset Password</button>

                </form>
            </div>
        </>
    )
}

export default ForgotPassword
