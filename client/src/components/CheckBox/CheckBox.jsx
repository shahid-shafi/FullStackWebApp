import userEvent from '@testing-library/user-event'
import React, { useState, useEffect } from 'react'

const CheckBox = ({ options, checkedOptions, handleOnChange }) => {
    return (
        <div>
            <h3>Select Your Hobbies</h3>
            <div>
                <input
                    type="checkbox"
                    name="allSelect"
                    checked={checkedOptions.length === options.length || false}
                    onChange={handleOnChange}
                />
                <label>All Select</label>
            </div>

            {options.map((hobby, index) =>
                <div key={index}>
                    <input
                        type="checkbox"
                        name={hobby}
                        checked={checkedOptions.includes(hobby) || false}
                        onChange={handleOnChange}
                    />
                    <label>{hobby}</label>
                </div>)}
        </div>
    )
}

export default CheckBox;