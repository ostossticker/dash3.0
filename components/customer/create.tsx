"use client"
import { addCustomer, editCustomer } from '@/app/(protected)/customer/actions/customer';
import useToggle from '@/hooks/stores';
import { useCurrentUser } from '@/hooks/use-current-user';
import { closeModal, fetchData } from '@/lib/functions';
import { url } from '@/lib/url';
import React, {  useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr';


type compInput = {
  label:string;
  type:string;
  name:string;
  value:string
  list:string;
  func:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

type customerProps = {
    cusName:string;
    cusTelegram:string;
    cusBus:string;
    cusPhone1:string
    cusPhone2:string
    cusComp: string
    cusMember: string
    cusEmail: string
    cusAddr: string
    cusWebsite: string
}


const CompInput = ({label,value,name,list,type,func}:compInput) =>{
    
  return (
    <div className='[&>span]:focus-within:text-mainBlue col-span-3 lg:col-span-1  px-3 py-1 pb-3'>
       <span className='text-[12px] font-bold text-slate-400'>{label}</span><br />
     {
      label === "Business" ?  (
        <>
        <input  type="text" list={list} className='w-full text-[13px] outline-none shadow-sm border-full solid 
        border-[1px] rounded-md border-slate-200 focus:border-mainLightBlue  h-[30px] px-1 bg-[#F8F8F8]
        ' name={name} value={value} onChange={func}/>
        <datalist id={list}>
            <option value="empty">empty</option>
            <option value="test">test</option>
        </datalist>
       </>
      ) : (
       
       <>
      
         <input type={type} className='w-full text-[13px] outline-none shadow-sm border-full solid 
               border-[1px] rounded-md border-slate-200 focus:border-mainLightBlue  h-[30px] px-1 bg-[#F8F8F8]
       ' name={name} value={value}  onChange={func}/>
       </>
      )
     }
    </div>
  )
}

type createProps ={
    cusName:string;
    cusTelegram:string;
    cusBus:string;
    cusPhone1:string;
    cusPhone2:string;
    cusComp:string;
    cusMember:string;
    cusEmail:string;
    cusAddr:string;
    cusWebsite:string;
}

const Create = () => {
  const { pending , setPending  ,edit , passingId} = useToggle()
  const user = useCurrentUser()


  const {data , error} = useSWR(`${url}/api/customer/${passingId}?email=${user?.email}`,fetchData)

  const cus:createProps = data?.editcus || ''
  const [val , setVal] = useState<customerProps>({
    cusName:'',
    cusTelegram:'',
    cusBus:'',
    cusPhone1:'',
    cusPhone2:'',
    cusComp:'',
    cusMember:'',
    cusEmail:'',
    cusAddr:'',
    cusWebsite:'',
  })

  useEffect(()=>{
    setVal({
      cusName:edit ? cus.cusName : '',
      cusTelegram:edit ? cus.cusTelegram : '',
      cusBus:edit ? cus.cusBus : '',
      cusPhone1:edit ? cus.cusPhone1 : '',
      cusPhone2:edit ? cus.cusPhone2 : '',
      cusComp:edit ? cus.cusComp : '',
      cusMember:edit ? cus.cusMember : '',
      cusEmail:edit ? cus.cusEmail : '',
      cusAddr:edit ? cus.cusAddr :'',
      cusWebsite:edit ? cus.cusWebsite : '',
    })
},[passingId,edit,cus])

  const left = useMemo(()=>[
    {
      label:"Name",
      type:"text",
      name:'cusName',
      val:val.cusName,
    },
    {
      label:'Business',
      type:'text',
      name:'cusBus',
      val:val.cusBus
    },
    
    {
      label:'Company',
      type:'text',
      name:'cusComp',
      val:val.cusComp
    },
    {
      label:'Member Since',
      type:'date',
      name:'cusMember',
      val:val.cusMember
    },
    {
      label:'Address',
      type:'text',
      name:'cusAddr',
      val:val.cusAddr
    }
  ],[val.cusName , val.cusBus,val.cusComp , val.cusMember , val.cusAddr])
  const right = useMemo(()=>[
    {
      label:'Telegram',
      type:'text',
      name:'cusTelegram',
      val:val.cusTelegram
    },
    {
      label:'Phone1',
      type:'text',
      name:'cusPhone1',
      val:val.cusPhone1
    },
    {
      label:'Phone2',
      type:'text',
      name:'cusPhone2',
      val:val.cusPhone2
    },
    {
      label:'Email',
      type:'email',
      name:'cusEmail',
      val:val.cusEmail
    },
    {
      label:"Website",
      type:'text',
      name:'cusWebsite',
      val:val.cusWebsite
    }
  ],[val.cusTelegram , val.cusPhone1 , val.cusPhone2 , val.cusEmail , val.cusWebsite])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name , value} = e.target
    setVal(prevState =>({
      ...prevState , [name]:value
    }))
  } 

  const onSave = async() =>{
    setPending(true)

    let validation = ''

    const {cusName,cusTelegram,cusBus,cusPhone1 ,cusPhone2 , cusComp , cusMember , cusEmail , cusAddr , cusWebsite} = val

    if(!cusName){
      validation= "sorry this field is required"
      toast.error(validation)
      setPending(false)
    }else{
       addCustomer({
        cusName: cusName,
        cusTelegram:cusTelegram,
        cusBus:cusBus,
        cusPhone1:cusPhone1,
        cusPhone2:cusPhone2,
        cusComp:cusComp,
        cusMember:cusMember,
        cusEmail:cusEmail,
        cusAddr:cusAddr,
        cusWebsite:cusWebsite
      }).then((data)=>{
        if(data?.error){
          toast.error(data.error)
          setPending(false)
        }
        if(data?.success){
          toast.success(data.success)
          setPending(false)
        }
      }).catch(()=>{
        toast.error("something went wrong")
        setPending(false)
      })
    }
    
  }

  const onUpdate = async() =>{
    setPending(true)

    let validation = ''

    const {cusName,cusTelegram,cusBus,cusPhone1 ,cusPhone2 , cusComp , cusMember , cusEmail , cusAddr , cusWebsite} = val

    if(!cusName){
      validation= "sorry this field is required"
      toast.error(validation)
      setPending(false)
    }else{
       editCustomer({
        id:passingId,
        cusName: cusName,
        cusTelegram:cusTelegram,
        cusBus:cusBus,
        cusPhone1:cusPhone1,
        cusPhone2:cusPhone2,
        cusComp:cusComp,
        cusMember:cusMember,
        cusEmail:cusEmail,
        cusAddr:cusAddr,
        cusWebsite:cusWebsite
      }).then((data)=>{
        if(data?.error){
          toast.error(data.error)
          setPending(false)
        }
        if(data?.success){
          toast.success(data.success)
          setPending(false)
        }
      }).catch(()=>{
        toast.error("something went wrong")
        setPending(false)
      })
    }
  }

  return (
    <>
    <div className='flex justify-center items-center'>
      <div >
      {
        left.map((item)=>{
          return(
                  <CompInput key={item.label} value={item.val} label={item.label} list={item.label} func={handleChange} name={item.name} type={item.type}/>
          )
        })
      }
      </div>
      <div >
      {
        right.map((item)=>{
          return(
            <CompInput key={item.label} value={item.val} label={item.label} list={item.label} func={handleChange} name={item.name} type={item.type}/>
          )
        })
      }
      </div>
    </div>
    <div className='flex justify-center items-center gap-5 mt-[20px]'>
      <button className={`px-4 py-1 text-white duration-200 ease-in-out ${val.cusName  !== "" ? "bg-insomnia-primary text-white" : "bg-slate-300 hover:bg-insomnia-primary"} w-[185px] rounded-md `} onClick={edit ? onUpdate : onSave}>{pending ? <span className='loading loading-spinner text-default'></span> : <p>Save</p>}</button>
      <button className={`px-4 py-1 text-white duration-200 ease-in-out bg-slate-300 hover:bg-mainLightRed w-[185px] rounded-md`} onClick={()=>closeModal('my_modal_5')}>Cancel</button>
    </div>
    </>
  )
}

export default Create