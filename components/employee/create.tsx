"use client"
import { addEmployee, editEmployee } from '@/app/(protected)/employee/action/employee';
import useToggle from '@/hooks/stores';
import { useCurrentUser } from '@/hooks/use-current-user';
import { closeModal, fetchData } from '@/lib/functions';
import { url } from '@/lib/url';
import React, { useEffect, useMemo, useRef, useState } from 'react'
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

type empProps = {
  empName:string;
  empId:string;
  empPhone:string;
  empNational:string;
  empAssc:string;
  empAddr:string;
  empTelegram:string;
  empGender:string;
  empOcc:string;
  memberSince:string;
  oldImg:string;
}

const CompInput = ({label,value,name,list,type,func}:compInput) =>{
 
  return (
    <div className='[&>span]:focus-within:text-mainBlue col-span-3 lg:col-span-1  px-3 py-1 pb-3'>
       <span className='text-[12px] font-bold text-slate-400'>{label}</span><br />
      
     {
      label === "Business" ?  (
        <>
        <input type="text" list={list} className='w-full text-[13px] outline-none shadow-sm border-full solid 
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

type createdProps = {
  empName:string;
  empGender:string;
  empOcc:string;
  empPhone:string;
  empNational:string;
  empAssc:string;
  empId:string;
  empAddr:string;
  empTelegram:string;
  memberSince:string;
  empCard:string;
}

const Create = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const { pending , setPending  ,edit , passingId} = useToggle()
  const user = useCurrentUser()

  const {data , error} = useSWR(`${url}/api/employee/${passingId}?email=${user?.email}`,fetchData)
  const emps:createdProps = data?.editEmp || ''

  const [image , setImage] = useState<File | undefined >(undefined)
  const [val , setVal] = useState<empProps>({
    empName:'',
    empId:'',
    empPhone:'',
    empNational:'',
    empAssc:'',
    empAddr:'',
    empTelegram:'',
    empGender:'',
    empOcc:'',
    memberSince:'',
    oldImg:''
  })

  useEffect(()=>{
    setVal({
      empName:edit ? emps.empName : '',
      empAddr:edit ? emps.empAddr : '',
      empAssc:edit? emps.empAssc : '',
      empGender:edit ? emps.empGender : '',
      empId:edit? emps.empId : '',
      empNational:edit ? emps.empNational : '',
      empOcc:edit ? emps.empOcc : '',
      empPhone:edit ? emps.empPhone : '',
      empTelegram:edit ? emps.empTelegram : '',
      memberSince:edit ? emps.memberSince : '',
      oldImg:edit ? emps.empCard: ''
    })
  },[passingId , edit ,emps])

  const left = useMemo(()=>[
    {
      label:"Name",
      type:"text",
      name:'empName',
      val:val.empName,
    },
    {
      label:"Phone Number",
      type:"text",
      name:'empPhone',
      val:val.empPhone,
    },
    {
      label:"Asscoiate",
      type:"text",
      name:'empAssc',
      val:val.empAssc,
    },
    {
      label:"Telegram",
      type:"text",
      name:'empTelegram',
      val:val.empTelegram,
    },
    {
      label:"Occupation",
      type:"text",
      name:'empOcc',
      val:val.empOcc,
    },
  ],[val.empName , val.empPhone , val.empAssc , val.empTelegram , val.empOcc])

  const right = useMemo(()=>[
    {
        label:"Identity ID",
        type:"text",
        name:"empId",
        val:val.empId
    },
    {
        label:"Nationality",
        type:"text",
        name:"empNational",
        val:val.empNational
    },
    {
      label:"Address",
      type:"text",
      name:"empAddr",
      val:val.empAddr
    },
    {
      label:"Gender",
      type:"text",
      name:"empGender",
      val:val.empGender
    },
    {
      label:"Member Since",
      type:"text",
      name:"memberSince",
      val:val.memberSince
    }
  ],[val.empId , val.empNational,val.empAddr , val.empGender , val.memberSince])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name , value} = e.target
    setVal({
      ...val , [name]:value
    })
  } 

  const handleImageSelection = (ref:React.RefObject<HTMLInputElement>) =>{
    if(ref.current){
      ref.current.click()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileType = file.type;
      const validImageTypes: string[] = ['image/gif', 'image/jpeg', 'image/png'];
  
      if (validImageTypes.includes(fileType)) {
        setImage(file);
      } else {
        console.error('Invalid file type');
      }
    } else {
      console.error('No files selected');
    }
  };
  
  const onUpdate = () => {
    const {empName , empAddr , empAssc , oldImg , empGender , empId , empNational ,empOcc , empPhone , empTelegram} = val
    setPending(true)

    let validation = ''

    const formData = new FormData();

    if(image){
      formData.append('image',image)
    }
    if(!empName || !empPhone){
      validation = "sorry this field is required!"
      toast.error(validation)
      setPending(false)
    }else{
      editEmployee({
        id:passingId,
        empName:empName,
        empGender:empGender,
        empPhone:empPhone,
        empAddr:empAddr,
        empAssc:empAssc,
        empId:empId,
        empNational:empNational,
        empOcc:empOcc,
        empTelegram:empTelegram,
        oldImg:oldImg
      },formData)
      .then((data)=>{
        setImage(undefined)
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

  const onSave = async() => {
    const {empName , empAddr , empAssc , empGender , empId , empNational ,empOcc , empPhone , empTelegram} = val
    setPending(true)

    let validation = ''

    const formData = new FormData();

    if(image){
      formData.append('image',image)
    }
    if(!empName || !empPhone){
      validation = "sorry this field is required!"
      toast.error(validation)
      setPending(false)
    }else{
      addEmployee({
        empName:empName,
        empGender:empGender,
        empPhone:empPhone,
        empAddr:empAddr,
        empAssc:empAssc,
        empId:empId,
        empNational:empNational,
        empOcc:empOcc,
        empTelegram:empTelegram
      },formData)
      .then((data)=>{
        setImage(undefined)
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
    <div className=" flex justify-center pb-[20px] mx-[10px]">
          <label className={`bg-slate-300 hover:bg-mainLightBlue shadowHover cursor-pointer duration-200 ease-in-out px-3 w-full py-1 my-[2px] font-bold text-center text-white rounded-md`}
                    onClick={()=>handleImageSelection(fileInput)}>
              Identity Card
          </label>
    </div>
    <div className='flex justify-center items-center gap-5'>
    <button className={`px-4 py-1 text-white duration-200 ease-in-out ${val.empName  !== "" || val.empPhone !== '' ? "bg-insomnia-primary text-white" : "bg-slate-300 hover:bg-insomnia-primary"} w-[185px] rounded-md `} onClick={edit ? onUpdate : onSave}>{pending ? <span className='loading loading-spinner text-default'></span> : <p>Save</p>}</button>
      <button className={`px-4 py-1 text-white duration-200 ease-in-out bg-slate-300 hover:bg-mainLightRed w-[185px] rounded-md`} onClick={()=>closeModal('my_modal_5')}>Cancel</button>
    </div>
    <input type="file" className="hidden" ref={fileInput}  onChange={handleImageChange} />
    <input type="text" value={val.oldImg === '' ? 'empty' : val.oldImg} className='hidden'/>
    </>
  )
}

export default Create