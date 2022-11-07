import React from 'react'

function FormContainer(Form) {
    return (
        <div className='flex justify-center items-center bg-slate-300 h-full w-full p-20'>
            <Form />
        </div>
    )
}

export default FormContainer