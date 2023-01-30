import React, { useState } from 'react';
import Button from '../components/Button';

const Resend = ({ time, onComplete }) => {

    //2023-01-29T11:28:25.141Z
    console.log(time);
    const reminingTime = new Date(time);
    const time_left = calculateRemainingTime();
    const [timeStr, setTimeStr] = useState(time_left <=0 ? '' : '01:59');

    let intervalUid;

    function calculateRemainingTime(){
        const next_resend = reminingTime.getTime();
        const now = (new Date()).getTime();
        return next_resend - now;
    }

    function setReminigTime() {
        const time_left = calculateRemainingTime();
        console.log(time_left <= 0);
        if (time_left <= 0) {
            console.log(intervalUid)
            clearInterval(intervalUid);
            setTimeStr('')
            return
        }
        else {
            let seconds = Math.floor((time_left % (1000 * 60)) / 1000);
            let minutes = Math.floor((time_left % (1000 * 60 * 60)) / (1000 * 60));
            setTimeStr(`${minutes}:${seconds}`);
        }
    }


    intervalUid = setInterval(setReminigTime, 1000);

    return (
        <div className='p-4 bg-secondary-lg text-primary rounded-lg text-2xl flex flex-col gap-5 mt-4'>
            <p>Please Verify the email</p>
            {
                timeStr === '' ?
                    <Button handleClick={onComplete}>Resend</Button> :
                    <div className=' text-center'>
                        <div className=' bg-accent rounded-lg px-2'>{timeStr}</div>
                    </div>
            }
        </div>
    )
}

export default Resend
