import React from 'react'
import "./Form.css"
function FormInput(props) {
    const { inputChangeHandler, classes, label, name, Icon, errMessage, ...inputProps } = props;
   
    return (
        <div className='my-2'>
            <div className='flex flex-col space-y-1'>
                {label && <label className="font-bold text-slate-600">{inputProps.placeholder}</label>}
                <input
                    className={`leading-none outline-0 h-10 px-2 rounded-md w-80 shadow shadow-slate-400 hover:scale-105 ${classes}`}
                    onChange={(e) => inputChangeHandler(e)}
                    id={name}
                    name={name}
                    {...inputProps}
                />
            </div>
            {/* {<span className='text-xs text-red-600'>{errMessage}</span>} */}
        </div>
    )
}
export default FormInput
















 // const [focused, setFocused] = useState(false);
    // const handleFocus = () => {
    //     setFocused(true);
    // }
    // console.log(props)

     // onBlur={handleFocus}
                // focused={focused.toString()}
                // onFocus={() => inputProps.name === "passwordConfirm" && setFocused(true)} 