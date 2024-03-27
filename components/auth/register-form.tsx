"use client"
import React, { useState } from 'react'
import CardWrapper from './card-wrapper'
import { RegisterFunc } from '@/actions/Register'
import { TestApi } from '@/actions/test'
import { useRouter } from 'next/navigation'

type  formProps = {
    username:string,
    email:string,
    cpassword:string,
    password:string
}

const RegisterForm = () => {
     const router = useRouter()
     const [pending , setPending] = useState<boolean>(false)
     const [val , setVal] = useState<formProps>({
        username:'' , 
        email:'' ,
        cpassword:'' ,
        password:''
     })

     const [success , setSuccess] = useState<string | undefined>("")
     const [error , setError] = useState<string | undefined>("")
     const [errors , setErrors] = useState<formProps>({
        username:'',
        email:'',
        cpassword:'',
        password:''
     })

     const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name , value} = e.target
        setVal({
            ...val,[name]:value
        })
     }
     const handleSubmit = async () =>{
        setPending(true)
        setSuccess("")
        setError("")
        setErrors({
            username:'',
            email:'',
            password:'',
            cpassword:''
        })
        const validateEmail = (email: string): boolean => {
            // Regular expression for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        let validation = {
            username:'',
            email:'',
            cpassword:'',
            password:''
        }

        const {username , email , password , cpassword} = val
        if(!username){
            validation.username = "username is required!"
        }else if(username.length > 20){
            validation.username = "holy macarony wat on earth jesus baliba is that name?"
        }
        if(!email){
            validation.email = "email is required!"
        }else if (!validateEmail(email)){
            validation.email = "invalid email!"
        }
        if(!password){
            validation.password = "password is required!"
        }else if(password !== cpassword){
            validation.password = "make sure both password field are the same match"
        }
        if(!cpassword){
            validation.cpassword = "password is required!"
        }else if (cpassword.length < 6) {
            validation.cpassword = "ur dick too short must need atleast 6 inch!"
        }
        if(!errors.username && !errors.email && !errors.password && !errors.cpassword ){
            RegisterFunc(username , email , password , cpassword)
            .then((data)=>{
                if(data?.error){
                 setError(data.error)
                }
                if(data?.success){
                    setSuccess(data.success)
                    setPending(false)
                    router.push("/auth/login")
                }
            })
            .catch(()=>{
                setError("something went wrong")
            })
        }

        setErrors(validation)
     }


     const onClick = async() =>{
        alert("yes")
        const data = {test1:"1" ,test2:"2"}
        const arrays = [
            {description:"something",qty:1,unitprice:1,total:1},
            {description:"something1",qty:2,unitprice:2,total:2},
        ]
        await TestApi(data,arrays)
     }

  return (
    <>
    <CardWrapper
    headerLabel="Hellow new commers :D"
    backButtonLabel='Already have an account?'
    backButtonHref='/auth/login'
    >
        <div className='flex flex-col gap-y-2'>
            <label className='text-gray-500 text-sm'>Username</label>
            <input type="text" placeholder='username' name='username' value={val.username} onChange={handleChange} 
            className='px-4 py-2 border-b-[1px] w-[300px] border-gray-500 outline-none'/>
            {errors && <span className='bg-red-300 text-red-700'>{errors.username}</span>}
            <label className='text-gray-500 text-sm'>Email</label>
            <input type="email" placeholder='email' name='email' value={val.email} onChange={handleChange} 
            className='px-4 py-2 border-b-[1px] w-[300px] border-gray-500 outline-none'/>
            {errors && <span className='bg-red-300 text-red-700'>{errors.email}</span>}
            <label className='text-gray-500 text-sm'>Password</label>
            <input type="password" placeholder='password' value={val.cpassword} onChange={handleChange} name='cpassword' 
            className='px-4 py-2 border-b-[1px] w-[300px] border-gray-500 outline-none'/>
            {errors && <span className='bg-red-300 text-red-700'>{errors.cpassword}</span>}
            <label className='text-gray-500 text-sm'>Confirm Password</label>
            <input type="password" name="password" value={val.password} onChange={handleChange} placeholder='confirm password' 
            className='px-4 py-2 border-b-[1px] w-[300px] border-gray-500 outline-none'/>
            {errors && <span className='bg-red-300 text-red-700'>{errors.password}</span>}
            {error && <span className='bg-red-300 text-red-700 rounded-sm text-center'>{error}</span>}
            {success && <span className='bg-green-300 text-green-700 rounded-sm text-center'>{success}</span>}
            <div className='flex justify-center my-5'>
                <button onClick={handleSubmit} className='bg-blue-500 disabled:bg-gray-500 py-2 w-[200px] text-white rounded-full'>
                    {pending ? <span className='loading loading-spinner text-default'></span> : <p>Sign up</p>}
                </button>
            </div>
        </div>
        
    </CardWrapper>
    <div className='hidden'>
        <button className='bg-red-400' onClick={onClick}>login</button>
    </div>
    </>
  )
}

export default RegisterForm