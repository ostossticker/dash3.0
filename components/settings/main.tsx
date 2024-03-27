"use client"
import useToggle from '@/hooks/stores'
import React from 'react'
import FormInput from './form'
import Detail from './detail'

const MainSetting = () => {
    const {darkMode} = useToggle()

  return (
    <>
    <div className={`flex justify-center  border-[1px] p-4 ${darkMode ? "bg-dark-box-color" : ""} rounded-md`}>
        <FormInput/>
        <Detail/>
    </div>
    <div className='flex justify-end'>
    <button  className={`py-2 mt-2 px-4  text-white rounded focus:outline-none bg-[#f79f5f]`}>
            Update Change!
    </button>
    </div>
    </>
  )
}

export default MainSetting