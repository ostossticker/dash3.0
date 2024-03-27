"use client"

import { useCurrentUser } from '@/hooks/use-current-user'
import Image from 'next/image'
import React from 'react'

const Detail = () => {
    const user = useCurrentUser()
  return (
    <div className='p-2'>
        <div className='flex flex-col items-center'>
        <Image src={user?.image || "/profile.jpg"} alt='Profile' width={200} height={30} className='border-[1px] p-1'/>
        <div className='flex flex-row justify-center items-center'>
          <button className='text-white bg-[#f79f5f] rounded-md w-[50px] m-1'>Edit</button>
          <button className='text-white bg-red-300 rounded-md w-[50px] m-1'>Clear</button>
        </div>


        
        </div>
        
    </div>
  )
}

export default Detail