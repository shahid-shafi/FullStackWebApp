import React, { useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdPersonAdd, MdPerson } from 'react-icons/md'
import reducer from '../../utils/reducers/formReducer'
import FormButton from './FormComponents/FormButton'
import FormInput from './FormComponents/FormInput'
import Loader from '../Loaders/Loader'

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: ""
}

function Signup() {
  const navigate = useNavigate();
  const [user, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")

  const inputChangeHandler = async (e) => {
    dispatch({
      type: "inputChange",
      field: e.target.name,
      payload: e.target.value
    })
  }

  const inputs = [
    {
      id: 1,
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Username",
      errMessage: "UserName should be 3-16 characters and shouldn't include special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      label: "Email",
      name: "email",
      type: "text",
      placeholder: "Email",
      errMessage: "Enter valid email address",
      // pattern: "",
      required: true
    },
    {
      id: 3,
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
      errMessage: "Password should be 8-20 characters and include atleast 1 letter, 1 number, and 1 special character!",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,20}`,
      required: true
    },
    {
      id: 4,
      label: "Confirm Password",
      name: "passwordConfirm",
      type: "password",
      placeholder: "Confirm Password",
      errMessage: "Password's don't match!",
      // pattern: user.password,
      // required: true
    },
  ]

  useEffect(() => {
    console.log(user)
  }, [user])

  const submitSignupForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { username, email, password, passwordConfirm } = user
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/signup',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json"
        },
        data: {
          username, email, password, passwordConfirm
        }
      })
      console.log(res)
      if (res.statusText === 'OK' || 'Created') {
        setResponse(res.data.message)
      }
      if (res.data.message === 'Account Created Successfully!') {
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }

      // setTimeout(() => {
      //   navigate('/')
      // }, 3000)

    } catch (error) {
      alert(error)
    }
    setLoading(false);
  }

  return (
    <>
      {loading && <Loader />}
      <div className='flex flex-col justify-center items-center bg-slate-300 h-full w-full p-20'>
        <form onSubmit={submitSignupForm} className='px-20 py-10 bg-white rounded-lg'>

          {response && <h1 className='text-center bg-purple-700 text-white p-3 mb-4 font-semibold rounded-lg'>{response}</h1>}

          <div className='flex justify-center'>
            <FormButton to={"/login"} Icon={MdPerson} text={"Sign In"} classes={"py-2 px-6 bg-purple-700 text-white"} />

            <FormButton to={"/signup"} Icon={MdPersonAdd} text={"Sign Up"} classes={"bg-white py-2 px-6 text-purple-700"} />

          </div>

          {inputs.map(input => <FormInput inputChangeHandler={inputChangeHandler} key={input.id} {...input} />)}
          <button type='submit' className='flex justify-center items-center space-x-2 w-full bg-purple-700 h-10 rounded-md my-4 text-white'><MdPersonAdd /><span className='text-xs font-bold'>Sign Up</span></button>
        </form>
      </div>
    </>
  )
}

export default Signup;