import React, {useState, useEffect} from 'react';
import ReactConfetti from 'react-confetti';
import '../../index.css'


const Confetti = () => {
    const [windowDimension, setDimension]= useState({width: window.innerWidth, height: window.innerHeight})
    const detectSize = () => {
        setDimension({width: window.innerWidth, height: window.innerHeight});
    }
    useEffect(() =>{
     window.addEventListener('resize', detectSize);
     return() => {
        window.removeEventListener('resize', detectSize);
     }   
    }, [windowDimension])

    
    return(
        <div className='confetti-index'>
            <ReactConfetti
                width={windowDimension.width}
                height={windowDimension.height}
                tweenDuration={1000}
            />
            <div className='confetti-overlap'>
                <h1>Congratulations!</h1>
                <h4>'You Are The Employee Of The Month'</h4>
            </div>
        </div>
    )
};

export default Confetti;