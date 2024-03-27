"use client"

type formInputProps = {
    name:string,
    email:string,
    password:string,
    new_password:string,
}

import useToggle from '@/hooks/stores'
import React, { useState } from 'react'

const FormInput = () => {
    const {darkMode} = useToggle()

    const [val , setVal] = useState<formInputProps>({
        name:'',
        email:'',
        password:'',
        new_password:''
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
       const { name , value  } = e.target
       setVal({
        ...val , [name]:value
       }) 
    }

    const forminput = [
        {
            label:"Name",
            name:"name",
            val:val.name,
            type:"text",
            label_style:"",
            input_style:"",
            func:handleChange
        },
        {
            label:"Email",
            name:"email",
            val:val.email,
            type:"email",
            label_style:"",
            input_style:"",
            func:handleChange
        },
        {
            label:"Password",
            name:"password",
            val:val.password,
            type:"password",
            label_style:"",
            input_style:"",
            func:handleChange
        },
        {
            label:"New Password",
            name:"new_password",
            val:val.new_password,
            type:"password",
            label_style:"",
            input_style:"",
            func:handleChange
        }
    ]

  return (
    <div >
        {
            forminput?.map((item,index)=>{
                return(
                    <div key={index} className={index === 3 ? "" : "mb-4"}>
                        <label className={`${item.label_style}  black mb-1 ${darkMode ? "text-dark-lg-color" : "text-[#1a3158]"}`}>{item.label}</label>
                        <input className={`${item.input_style} w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`} type={item.type} value={item.val} name={item.name} onChange={item.func}/>
                    </div>
                )
            })
        }
       
    </div>
  )
}

export default FormInput