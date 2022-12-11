import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'
import FormInput from '../Form/FormComponents/FormInput';
import AuthContext from '../../store/auth-context'
import Loader from '../Loaders/Loader';
import CheckBox from '../CheckBox/CheckBox';

const EditUser = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(false)
    let [options, setOptions] = useState([
        "Cricket", "Badminton", "Travelling", "Movies", "Reading", "Video Games",
    ])
    //#region State

    const { currentUser } = useContext(AuthContext)
    const [user, setUser] = useState(currentUser)
    const [checkedOpt, setCheckedOpt] = useState(user.hobbies)

    //#region Handlers
    const inputChangeHandler = e => {
        setUser({ [e.target.name]: e.target.value })
    }

    const handleOnChange = (e) => {
        if (e.target.name === 'allSelect') {
            if (e.target.checked) {
                setCheckedOpt(options);
            } else {
                setCheckedOpt([]);
            }
        } else {
            if (e.target.checked) {
                setCheckedOpt([...checkedOpt, e.target.name])
            }
            else setCheckedOpt(checkedOpt.filter(opt => opt !== e.target.name))
        }
    }

    const updateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios({
                method: 'PATCH',
                url: `/api/v1/user/${currentUser._id}`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    ...user, hobbies: [...checkedOpt]
                }
            })
            console.log(res)
            if (res.data.result === 'success') {
                setResponse(res.data.message)
                setTimeout(() => {
                    navigate('/user')
                }, 2000)
            }
        } catch (error) {
            alert(error)
        }
        setLoading(false);
    }

    return (
        <>
            {loading && <Loader />}
            <div className='flex justify-center items-center bg-slate-300 h-full w-full p-20'>
                <form onSubmit={updateUser} className='relative p-10 bg-white rounded-lg text-slate-700'>
                    {response && <h1 className='text-center bg-purple-700 text-white p-3 my-4 font-semibold rounded-lg'>{response}</h1>}
                    <Link to="/user" className='absolute left-6 top-6 text-2xl text-purple-700'><BiArrowBack /></Link>
                    <h1 className='text-center font-bold text-purple-700 rounded-full bg-slate-200 py-2'>Edit User</h1>
                    
                    <FormInput inputChangeHandler={inputChangeHandler}
                        label="Name"
                        value={user.name}
                        name={"name"}
                    />
                    <FormInput inputChangeHandler={inputChangeHandler}
                        label="Username"
                        value={user.username}
                        name={"username"}
                    />
                    <FormInput inputChangeHandler={inputChangeHandler}
                        label="Email"
                        value={user.email}
                        name={"email"}
                    />

                    <div className='space-x-2 p-2 pl-0'>
                        <label className='font-bold'>Gender</label>
                        <input onChange={inputChangeHandler} type="radio" name='gender' value="Male" checked={user.gender === "Male" ? true : false} />Male
                        <input onChange={inputChangeHandler} type="radio" name='gender' value="Female" checked={user.gender === "Female" ? true : false} />Female
                    </div>
                    <CheckBox options={options} checkedOptions={checkedOpt} handleOnChange={handleOnChange} />

                    <button type='submit' className='flex justify-center items-center space-x-2 w-full bg-purple-700 h-10 rounded-md my-4 text-white'><span className='text-xs font-bold'>submit</span></button>
                </form>
            </div>
        </>
    )
}

export default EditUser;