import React, { useState } from 'react';
import { AnimatePresence,motion } from 'framer-motion';

import './joinroom.css';
export default function JoinRoomPage() {
    const [roomCode, setRoomCode] = useState('');
    const [roomPassVisibility,setRoomPassVisibility]=useState("password");
    const [roomPass, setRoomPass] = useState('');

    const handleRoomCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomCode(event.target.value);
    };
    const handleRoomPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomPass(event.target.value);
        // Logic to set room password
    }
    const changeRoomPassVisibility=()=>{
        if(roomPassVisibility==="password")
        {
            setRoomPassVisibility("text");
            setTimeout(()=>{setRoomPassVisibility("password")},2000);
        }
        else
        {
            setRoomPassVisibility("password");
        }
    }

    const errorText = "No room found with that code.";


    return (
        <AnimatePresence mode="wait">
        <motion.div key={location.pathname}
        initial={{transform:" translateY(-70%) scaleY(0.2)"}}
        animate={{transform:"translateY(0%) scaleY(100%)"}}
        exit={{opacity:0, transition: { duration: 0.5 } }}
        transition={{ duration: 1.2 }}
        className='motiondivFlex'

>
        <div className=' borderanimation roomdatadiv'>
            <span className='text-left'>Room Code</span>
            <div>
                <input type="text" className='roomCodeInput' value={roomCode} onChange={handleRoomCodeChange} placeholder="Room Code"/>
            </div>
            <span className='text-left'>Password</span>
            <div style={{display:"flex"}}>
                <input type={roomPassVisibility} className='roomCodeInput' value={roomPass} onChange={handleRoomPassChange} placeholder="Optional"/>
                <button onClick={changeRoomPassVisibility}>{"<>"}</button>
            </div>
            {errorText && <span className='error'>{errorText}</span>}
        </div>
        </motion.div>
      
      </AnimatePresence>
        
    );
}
