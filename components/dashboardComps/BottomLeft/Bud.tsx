import Weather from '@/components/dashboardComps/weather/weather';
import useToggle from '@/hooks/stores'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Bud = () => {
  const {currentTime , setCurrentTime} = useToggle();
  const [currentDate , setCurrentDate] = useState<string>('');
  const { isOpen , isHover } = useToggle()
  useEffect(()=>{
    const currentDate = new Date()
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
    const day = currentDate.getDate();

    const formattedDate = `${dayOfWeek}, ${month} ${day}`;
    setCurrentDate(formattedDate);

    const intervalId = setInterval(()=>{
      setCurrentTime(new Date());
    },1000)
    return () => clearInterval(intervalId)
  },[setCurrentTime])

  const formattedTime: string = currentTime.toLocaleTimeString([] ,
    {
      hour: "2-digit" , 
      minute: '2-digit',
      hour12: false,
    });

  return (
    <div className=' ml-[40px] shadow-md rounded-lg relative hidden lg:block'>
        <Image src="/test1.gif" width={768} alt='#'
        height={0} className='rounded-lg'/>
        <div className='absolute top-[2%] left-[2%] p-2 '>
            <div className={`font-semibold ${isHover || isOpen ? "text-[38px]" : "text-[40px]"} text-center h-[50px]`}>
              {formattedTime}
              </div>
            <Weather/>
            <p className={`text-center font-semibold ${isOpen || isHover ? "text-[14px]" : ""}`}>{currentDate}</p>
            
        </div>
    </div>
  )
}

export default Bud