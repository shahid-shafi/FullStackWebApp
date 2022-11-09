import React, { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import FormInput from './FormComponents/FormInput'
import { useParams, useNavigate } from "react-router-dom";
import reducer from '../../utils/reducers/formReducer'

const initialState = {
    password: "",
    passwordConfirm: ""
}
function PasswordReset() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [user, dispatch] = useReducer(reducer, initialState);
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)

    const inputChangeHandler = async (e) => {
        dispatch({
            type: "inputChange",
            field: e.target.name,
            payload: e.target.value
        })
    }
    console.log(token, user)

    const submitPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { password, passwordConfirm } = user

        try {
            const res = await axios({
                method: 'POST',
                url: `/api/v1/user/resetPassword/:${token}`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    password, passwordConfirm
                }
            })
            // navigate('')
            console.log(res)
            if (res.data.result === 'success') {
                setResponse(res.data.message)
                // setTimeout(() => {
                //     navigate('/')
                // }, 2000)
            }
        } catch (error) {
            alert(error)
        }
        setLoading(false);
    }

    return (
        <>
            <div className='flex justify-center items-center bg-slate-300 h-full w-full p-20'>
                <form onSubmit={submitPassword} className='px-20 py-10 bg-white rounded-lg'>
                    {response && <h1 className='text-center bg-purple-700 text-white p-3 my-4 font-semibold rounded-lg'>{response}</h1>}
                    <h1 className='text-center text-2xl font-bold text-purple-700 leading-none mb-6'>Password Reset</h1>
                    <FormInput inputChangeHandler={inputChangeHandler} name="password" type={"password"} placeholder={"New Password"} />
                    <FormInput inputChangeHandler={inputChangeHandler} name="passwordConfirm" type={"password"} placeholder={"Confirm New Password"} />
                    <div className="text-sky-600 text-sm">
                        <input className="p-2" type="checkbox" name="" id="" />
                        <label className="leading-none">Show Password</label>
                    </div>
                    <button type='submit' className='items-center space-x-2 w-full bg-purple-700 h-10 rounded-md my-4 text-white'>submit</button>
                </form>
            </div>
        </>
    )
}

export default PasswordReset;