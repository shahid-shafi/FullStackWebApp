import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'


const Loader = () => {
    return (
        <div className='h-full bg-slate-100 bg-opacity-60 absolute flex justify-center items-center w-full'>
            <ThreeCircles
                height="60"
                width="60"
                color="blueviolet"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="blueviolet"
                middleCircleColor=""
                innerCircleColor="gray"
            />
        </div>
    )
}

export default Loader

