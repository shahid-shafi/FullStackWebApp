import React from 'react'
import { Link } from 'react-router-dom'

function FormButton({ to, onClick, text, Icon, classes }) {
    return (
        <Link to={to} onClick={onClick} className={`flex mx-4 space-x-1 border-zinc-600 border rounded-md  ${classes}`}><Icon /><span className='text-xs font-bold'>{text}</span></Link>
    )
}
export default FormButton