import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import reducer from '../../utils/reducers/formReducer'
import { MdPersonAdd, MdPerson, MdExitToApp } from 'react-icons/md'
import FormButton from './FormComponents/FormButton'
import Loader from '../Loaders/Loader'
import FormInput from './FormComponents/FormInput'

const initialState = {
    email: "",
    password: ""
}

export function Login() {
    const navigate = useNavigate();
    const [user, dispatch] = useReducer(reducer, initialState);
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("password")
    // const [passwordType, setPasswordType] = useState("password")

    const inputChangeHandler = e => {
        dispatch({
            type: "inputChange",
            field: e.target.name,
            payload: e.target.value
        })
    }

    // const passwordVisibility = () => {
    //     if (passwordType === "password") setPasswordType("text")
    //     else setPasswordType("password")
    // }

    const submitLogInForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/users/login',
                headers: {
                    "Content-Type": "application/json"
                },
                data: user
            })
            // navigate('')
            console.log(res)
            if (res.data.result === 'success') {
                setResponse(res.data.message)
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }
        } catch (error) {
            alert(error)
        }
        setLoading(false);
    }

    const inputs = [
        {
            id: 1,
            label: "Email",
            name: "email",
            type: "text",
            placeholder: "Email",
            errMessage: "Enter valid email address",
            // pattern: "",
            // required: true
        },
        {
            id: 2,
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Password",
            errMessage: "Password should be 8-20 characters and include atleast 1 letter, 1 number, and 1 special character!",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,20}`,
            // required: true
        },
    ]

    return (
        <>
            {loading && <Loader />}
            <div onSubmit={submitLogInForm} className='flex justify-center items-center bg-slate-300 h-full w-full p-20'>
                <form className='px-20 py-24 bg-white rounded-lg'>
                    {response && <h1 className='text-center bg-purple-700 text-white p-3 my-4 font-semibold rounded-lg'>{response}</h1>}
                    <div className='flex justify-center'>
                        <FormButton to={"/login"} Icon={MdPerson} text={"Sign In"} classes={"bg-white py-2 px-6 text-purple-700"} />

                        <FormButton to={"/signup"} Icon={MdPersonAdd} text={"Sign Up"} classes={"bg-purple-700 py-2 px-6 rounded-md text-white"} />

                    </div>

                    {inputs.map(input => <FormInput inputChangeHandler={inputChangeHandler} key={input.id} {...input} />)}
                    <button type='submit' className='flex justify-center items-center space-x-2 w-full bg-purple-700 h-10 rounded-md my-4 text-white'><MdExitToApp /><span className='text-xs font-bold'>Sign Up</span></button>
                </form>
            </div>
        </>
    )
}