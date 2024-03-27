"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoIosArrowDown,IoIosNotifications, IoMdMail } from 'react-icons/io'
import { motion } from 'framer-motion'

////icons
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useToggle from '@/hooks/stores';
import { useCurrentUser } from '@/hooks/use-current-user'
import { logout } from '@/actions/logout'

type profileProps = {
  toggleMode:boolean
}

const Profile = ({toggleMode} : profileProps) => {
  const [hidden , setHidden] = useState<boolean>(false)
  const user = useCurrentUser()

  //// theme switcher
  const {darkMode , toggleDarkMode,initializeDarkModeFromLocalStorage} = useToggle()

  useEffect(()=>{
    initializeDarkModeFromLocalStorage();
  },[initializeDarkModeFromLocalStorage])

  //// end theme switcher

  const openModal = () => {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };


  const handleEnter = () =>{
    setHidden(true)
  }
  const handleLeave = () =>{
    setHidden(false)
  }

  const onClick = () =>{
    logout()
  }

  const LogoData = [
    {
      label:"Profile",
      icon:MdOutlineAccountCircle,
      func:()=>{}
    },
    {
      label:"Settings",
      icon:IoSettingsOutline,
      func:openModal
    },
    {
      label:"Log Out",
      icon:RiLogoutBoxLine,
      func:onClick
    },
  ]

  return (
    <>
    
    <div className='relative group cursor-pointer mx-[6px]'>
    <IoMdMail size={25} color={toggleMode ? "#F0F7FF" : ""}/>
    <div
            className="absolute  -top-[4px] -left-[355%] transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[80px] transform">
            <div className={`relative top-6 p-6  ${darkMode ? "bg-dark-lg-color" : "bg-gray-800"} rounded-xl shadow-xl w-[130px]`}>
              <div
                className={`w-10 h-10  ${darkMode ? "bg-dark-lg-color" : "bg-gray-800"} transform rotate-45 absolute top-0 right-5 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm`}>
              </div>
              <div className="relative z-10">
                <ul className="text-[15px]">
                  {
                    LogoData?.map((item)=>{
                      return(
                      <li key={item.label}>
                        <div className={`flex ${darkMode? "text-dark-box-color" : "text-white"} py-1 items-center font-normal`}>
                          <item.icon size={15} className='mr-[5px]'/> {item.label}
                        </div>
                      </li>
                      )
                    })
                  }
                </ul>


              </div>
            </div>
          </div>
    </div>
    
    <div className='relative group cursor-pointer mx-[6px]'>
    <IoIosNotifications size={25} className='flex' color={toggleMode ? "#F0F7FF" : ""}/>
    <div
            className="absolute  -top-[4px] -left-[335%] transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[80px] transform">
            <div className={`relative top-6 p-6  ${darkMode ? "bg-dark-lg-color" : "bg-gray-800"} rounded-xl shadow-xl w-[130px]`}>
              <div
                className={`w-10 h-10  ${darkMode ? "bg-dark-lg-color" : "bg-gray-800"} transform rotate-45 absolute top-0 right-[20%] z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm`}>
              </div>
              <div className="relative z-10">
                <ul className="text-[15px]">
                  {
                    LogoData?.map((item)=>{
                      return(
                      <li key={item.label}>
                        <div className={`flex ${darkMode ? "text-dark-box-color" : "text-white"} py-1 items-center font-normal`}>
                          <item.icon size={15} className='mr-[5px]'/> {item.label}
                        </div>
                      </li>
                      )
                    })
                  }
                </ul>


              </div>
            </div>
          </div>
    </div>

    <DarkModeSwitch
      onChange={toggleDarkMode}
      checked={darkMode}
      size={25}
      color={toggleMode ? "#F0F7FF" : ""}
    />
    
    <div className='relative group flex cursor-pointer justify-center items-center' onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
    <div className={`border-[1px] ${toggleMode ? "border-dark-lg-color" : "border-red-300"} p-[3px] rounded-full ml-[8px]`}>
        <Image src={user?.image || "/profile.jpg"} alt='Profile' width={30} height={50} className='rounded-full'/>

    </div>
    <p className={`ml-[5px] ${toggleMode ? "text-dark-lg-color" : ""}`}>{user?.name ? user?.name : "Guest"}</p>
    <motion.div animate={
        hidden ? {
            rotate:0
        } : {
            rotate:180
        }
    }>
    <IoIosArrowDown size={12} className='mx-[5px]' color={toggleMode ? "#F0F7FF" : ""}/>
    </motion.div>
    <div
            className={`absolute  top-1 ${user?.name.length < 11 ? "-left-[1rem]" : "left-6"} transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[200px] transform`}>
            <div className={`relative top-6 p-6 ${darkMode ? "bg-dark-lg-color" : "bg-gray-800"} rounded-xl shadow-xl w-[130px]`}>
              <div
                className={`w-10 h-10  ${darkMode ? "bg-dark-lg-color" : "bg-gray-800"} transform rotate-45 absolute top-0 right-[20%] z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm`}>
              </div>
              <div className="relative z-10">
                <ul className="text-[15px] ">
                  {
                    LogoData?.map((item)=>{
                      return(
                      <li key={item.label} onClick={item.func}>
                        <div className={`flex ${darkMode ? "text-dark-box-color" : "text-white"} py-1 items-center font-normal`}>
                          <item.icon size={15} className='mr-[5px]'/> {item.label}
                        </div>
                      </li>
                      )
                    })
                  }
                </ul>


              </div>
            </div>
          </div>
    
    </div>
   
    </>
  )
}

export default Profile