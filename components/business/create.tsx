"use client"
import { addBus, editBusiness } from '@/app/(protected)/bussiness/action/business';
import useToggle from '@/hooks/stores'
import { useCurrentUser } from '@/hooks/use-current-user';
import { closeModal, fetchData } from '@/lib/functions';
import { url } from '@/lib/url';
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr';

  type compInput = {
    label:string;
    type:string;
    name:string;
    value:string
    list:string;
    func:(e: React.ChangeEvent<HTMLInputElement>) => void;
    funcChange?:(e:React.ChangeEvent<HTMLSelectElement>) => void;
  }

  type businessProps = {
    /////// business info
    busName:string;
    busEmail:string;
    busType:string;
    busAddr:string;
    busPhone1:string;
    busPhone2:string;
    busDes:string;
    busInvkh:string;
    busTelegram:string;
    busInvEng:string;
    /////// payment info
    busBankName:string;
    busBankNumber:string;
    busBankDes:string;
    busPayTerm:string;
    ///// old img
    oldImg?:string;
    oldImg1?:string;
    oldImg2?:string;
    oldImg3?:string;
    oldImg4?:string;
  }

  type busImgProps = {
    abaQr:File | undefined;
    signature:File | undefined;
    busLogo:File | undefined;
    Rec1:File | undefined;
    Rec2:File | undefined;
  }


  const CompInput = ({label,value,name,list,type,func,funcChange}:compInput) =>{
    
    return (
      <div className='[&>span]:focus-within:text-mainBlue col-span-3 lg:col-span-1  px-3 py-1 pb-3'>
         <span className='text-[12px] font-bold text-slate-400'>{label}</span><br />
       {
        type === "select" ?  (
          <>
          <select className='w-full text-[13px] outline-none shadow-sm border-full solid 
          border-[1px] rounded-md border-slate-200 focus:border-mainLightBlue  h-[30px] px-1 bg-[#F8F8F8]
          ' name={name} value={value} onChange={funcChange}>
              <option value="empty">m2</option>
              <option value="test">general</option>
          </select>
         
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

type createProps = {
    busName:string;
    busEmail:string;
    busType:string;
    busAddr:string;
    busPhone1:string;
    busPhone2:string;
    busDes:string;
    busInvkh:string;
    busTelegram:string;
    busInvEng:string;
    /////// payment info
    busBankName:string;
    busBankNumber:string;
    busBankDes:string;
    busPayTerm:string;
    /////image type 
    abaQr:string;
    signature:string;
    busLogo:string;
    Rec1:string;
    Rec2:string
}

const Create = () => {
    const { pending , setPending , bgModal ,edit , passingId} = useToggle()
    const user = useCurrentUser()
    const ref1 = useRef<HTMLInputElement>(null)
    const ref2 = useRef<HTMLInputElement>(null)
    const ref3 = useRef<HTMLInputElement>(null)
    const ref4 = useRef<HTMLInputElement>(null)
    const ref5 = useRef<HTMLInputElement>(null)

    const { data , error } = useSWR(`${url}/api/business/${passingId}?email=${user?.email}`,fetchData)

    const buses:createProps = data?.editbus || ''
    
    const [val , setVal] = useState<businessProps>({
        busName:'',
        busAddr:'',
        busBankDes:'',
        busBankName:'',
        busBankNumber:'',
        busDes:'',
        busEmail:'',
        busInvEng:'',
        busInvkh:'',
        busPayTerm:'',
        busPhone1:'',
        busPhone2:'',
        busTelegram:'',
        busType:'',
        oldImg:'',
        oldImg1:'',
        oldImg2:'',
        oldImg3:'',
        oldImg4:''
    })

    useEffect(()=>{
        setVal({
            busName:edit ? buses.busName : '',
            busAddr:edit ? buses.busAddr : '',
            busBankDes:edit ? buses.busBankDes : '',
            busBankName:edit ? buses.busBankName : '',
            busBankNumber:edit ? buses.busBankNumber : '',
            busDes:edit ? buses.busDes : '',
            busEmail:edit ? buses.busEmail : '',
            busInvEng:edit ? buses.busInvEng : '',
            busInvkh:edit ? buses.busInvkh : '',
            busPayTerm:edit ? buses.busPayTerm : '',
            busPhone1:edit? buses.busPhone1 : '',
            busPhone2:edit ? buses.busPhone2 : '',
            busTelegram:edit ? buses.busTelegram : '',
            busType:edit ? buses.busType : '',
            oldImg:edit ? buses.abaQr : '',
            oldImg1:edit ? buses.signature : '',
            oldImg2:edit ? buses.busLogo : '',
            oldImg3:edit ? buses.Rec1 : '',
            oldImg4:edit ? buses.Rec2 : ''
        })
      },[passingId, edit, buses]);

    const [image , setImage] = useState<busImgProps>({
        abaQr:undefined,
        signature:undefined,
        busLogo:undefined,
        Rec1:undefined,
        Rec2:undefined
    })

    const Busleft = useMemo(()=>[
        {
            label:'Business Name',
            type:"text",
            name:"busName",
            val:val.busName
        },
        {
            label:'Business Select',
            type:"select",
            name:"busType",
            val:val.busType
        },
        {
            label:'Phone Number 1',
            type:"text",
            name:"busPhone1",
            val:val.busPhone1
        },
        {
            label:'Phone Number 2',
            type:"text",
            name:"busPhone2",
            val:val.busPhone2
        },
        {
            label:'Telegram',
            type:"text",
            name:"busTelegram",
            val:val.busTelegram
        },
    ],[val.busName ,val.busType,val.busPhone1 , val.busPhone2 ,val.busTelegram])
    const Busright = useMemo(()=>[
        {
            label:'Email',
            type:"text",
            name:"busEmail",
            val:val.busEmail
        },
        {
            label:'Address',
            type:"text",
            name:"busAddr",
            val:val.busAddr
        },
        {
            label:'Business Description',
            type:"text",
            name:"busDes",
            val:val.busDes
        },
        {
            label:'Invoice Khmer',
            type:"text",
            name:"busInvkh",
            val:val.busInvkh
        },
        {
            label:'Invoice English',
            type:"text",
            name:"busInvEng",
            val:val.busInvEng
        },
    ],[val.busEmail,val.busAddr , val.busDes , val.busInvEng , val.busInvkh])

    const Payleft = useMemo(()=>[
        {
            label:"Bank Name",
            type:'text',
            name:'busBankName',
            val:val.busBankName
        },
        {
            label:"Bank Number",
            type:'text',
            name:'busBankNumber',
            val:val.busBankNumber
        },
        {
            label:"Bank Description",
            type:'text',
            name:'busBankDes',
            val:val.busBankDes
        },
        {
            label:"Payment Term",
            type:'text',
            name:'busPayTerm',
            val:val.busPayTerm
        },
    ],[val.busBankName , val.busBankNumber,val.busBankDes , val.busPayTerm])
    const Payright = useMemo(()=>[
        {
            label:"Aba Qr",
            type:"button",
            name:"abaQr",
            func:()=>handleImageSelection(ref1,'abaQr' as keyof busImgProps),
            val:image.abaQr
        },
        {
            label:"Signature",
            type:"button",
            name:"signature",
            func:()=>handleImageSelection(ref2,'signature' as keyof busImgProps),
            val:image.signature
        },
        {
            label:"Business Logo",
            type:"button",
            name:"busLogo",
            func:()=>handleImageSelection(ref3,'busLogo' as keyof busImgProps),
            val:image.busLogo
        },
        {
            label:"Receipt Logo1",
            type:"button",
            name:"Rec1",
            func:()=>handleImageSelection(ref4,'Rec1' as keyof busImgProps),
            val:image.Rec1
        },
        {
            label:"Receipt Logo2",
            type:"button",
            name:"Rec2",
            func:()=>handleImageSelection(ref5,'Rec2' as keyof busImgProps),
            val:image.Rec2
        },
    ],[image.abaQr,image.busLogo,image.signature , image.Rec1 , image.Rec2])

    useEffect(()=>{
        console.log(val)
    })

    const handleBusChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name , value} = e.target
        setVal({
            ...val,[name]:value
        })
    }

    const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        const {name , value} = e.target
        setVal({
            ...val,[name]:value
        })
    }

    const handleImageSelection = (ref: React.RefObject<HTMLInputElement>, key: keyof busImgProps) => {
        if (ref.current) {
          ref.current.click();
        }
      };
    
      const handleImageChange = (e: ChangeEvent<HTMLInputElement>, key: keyof busImgProps) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          const fileType = file.type;
          const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      
          if (validImageTypes.includes(fileType)) {
            setImage((prevState) => ({
              ...prevState,
              [key]: file,
            }));
          }else {
            console.error('Invalid file type');
          }
        }else{
          console.error('no files selected')
        }
      };

    const onSave = async() =>{
        const {busName , busAddr , busBankDes, busBankName , busBankNumber , busDes , busEmail , busInvEng , busInvkh , busPayTerm , busPhone1 , busPhone2 , busTelegram , busType} = val
        setPending(true)
    
        let validation = ''
    
        const formData = new FormData();
    
        if (image.abaQr) {
          formData.append('abaQr', image.abaQr);
        }
    
        if (image.signature) {
            formData.append('signature', image.signature);
        }

        if (image.busLogo){
            formData.append("busLogo",image.busLogo)
        }

        if(image.Rec1){
            formData.append("Rec1",image.Rec1)
        }
        if(image.Rec2){
            formData.append("Rec2",image.Rec2)
        }
    
        if(!busName || !busEmail || !busType){
          validation= "sorry this field is required"
          toast.error(validation)
          setPending(false)
        }else{
           addBus({
            busName:busName,
            busEmail:busEmail,
            busType:busType,
            busAddr:busAddr,
            busBankDes:busBankDes,
            busBankName:busBankName,
            busBankNumber:busBankNumber,
            busDes:busDes,
            busInvEng:busInvEng,
            busInvkh:busInvkh,
           },formData)
           .then((data)=>{
            setImage({
              abaQr:undefined,
              signature:undefined,
              busLogo:undefined,
              Rec1:undefined,
              Rec2:undefined,
            });
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
        const {busName ,oldImg , oldImg1 , oldImg2 , oldImg3 , oldImg4, busAddr , busBankDes, busBankName , busBankNumber , busDes , busEmail , busInvEng , busInvkh , busPayTerm , busPhone1 , busPhone2 , busTelegram , busType} = val
        setPending(true)
    
        let validation = ''
    
        const formData = new FormData();
    
        if (image.abaQr) {
          formData.append('abaQr', image.abaQr);
        }
    
        if (image.signature) {
            formData.append('signature', image.signature);
        }

        if (image.busLogo){
            formData.append("busLogo",image.busLogo)
        }

        if(image.Rec1){
            formData.append("Rec1",image.Rec1)
        }
        if(image.Rec2){
            formData.append("Rec2",image.Rec2)
        }
    
        if(!busName || !busEmail || !busType){
          validation= "sorry this field is required"
          toast.error(validation)
          setPending(false)
        }else{
           editBusiness({
            id:passingId,
            busName:busName,
            busEmail:busEmail,
            busType:busType,
            busAddr:busAddr,
            busBankDes:busBankDes,
            busBankName:busBankName,
            busBankNumber:busBankNumber,
            busDes:busDes,
            busInvEng:busInvEng,
            busInvkh:busInvkh,
            oldImg:oldImg,
            oldImg1:oldImg1,
            oldImg2:oldImg2,
            oldImg3:oldImg3,
            oldImg4:oldImg4
           },formData)
           .then((data)=>{
            setImage({
              abaQr:undefined,
              signature:undefined,
              busLogo:undefined,
              Rec1:undefined,
              Rec2:undefined,
            });
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
    {
        bgModal === "bgLeft" && (
           <>
             <div className='flex justify-center items-center'>
                <div>
                    {
                        Busleft.map((item)=>{
                            return(
                                <CompInput key={item.label} value={item.val} label={item.label} list={item.label} func={handleBusChange} funcChange={handleSelectChange} name={item.name} type={item.type}/>
                            )
                        })
                    }
                </div>
                <div>
                    {
                        Busright.map((item)=>{
                            return(
                                <CompInput key={item.label} value={item.val} label={item.label} list={item.label} func={handleBusChange} name={item.name} type={item.type}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex justify-center items-center gap-5 mt-[20px]'>
                <button className={`px-4 py-1 text-white duration-200 ease-in-out ${val.busName !== "" || val.busType !== "" ? "bg-insomnia-primary text-white" : "bg-slate-300 hover:bg-insomnia-primary"} w-[185px] rounded-md `} onClick={edit ? onUpdate : onSave}>{pending ? <span className='loading loading-spinner text-default'></span> : <p>Save</p>}</button>
                <button className={`px-4 py-1 text-white duration-200 ease-in-out bg-slate-300 hover:bg-mainLightRed w-[185px] rounded-md`} onClick={()=>closeModal('my_modal_5')}>Cancel</button>
            </div>
           </>
        )
    }
    {
        bgModal === "bgRight" && (
            <>
            <div className='flex justify-center items-center'>
                <div>
                    {
                        Payleft.map((item)=>{
                            return(
                                <CompInput key={item.label} value={item.val} label={item.label} list={item.label} func={handleBusChange} name={item.name} type={item.name}/>
                            )
                        })
                    }
                </div>
                <div className='mt-3'>
                    {
                        Payright.map((item)=>{
                            return(
                                <div className='flex justify-center pb-3 w-[184px] mx-[11px]' key={item.label}>
                                    <label className={`bg-slate-300 hover:bg-mainLightBlue  shadowHover cursor-pointer duration-200 ease-in-out px-3 w-full py-1 my-[2px] font-bold text-center text-white rounded-lg`} onClick={item.func}>
                                        {item.label}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex justify-center items-center gap-5 mt-[20px]'>
                <button className={`px-4 py-1 text-white duration-200 ease-in-out ${val.busName  !== "" || val.busType !== "" ? "bg-insomnia-primary text-white" : "bg-slate-300 hover:bg-insomnia-primary"} w-[185px] rounded-md `} onClick={edit ? onUpdate : onSave}>{pending ? <span className='loading loading-spinner text-default'></span> : <p>{edit ? "Edit" : "Save"}</p>}</button>
                <button className={`px-4 py-1 text-white duration-200 ease-in-out bg-slate-300 hover:bg-mainLightRed w-[185px] rounded-md`} onClick={()=>closeModal('my_modal_5')}>Cancel</button>
            </div>
            </>
        )
    }
    <input type="file" ref={ref1} className='hidden' name='abaQr' onChange={(e)=>handleImageChange(e,'abaQr')}/>
    <input type="file" ref={ref2} className='hidden' name='signature' onChange={(e)=>handleImageChange(e,'signature')}/>
    <input type="file" ref={ref3} className='hidden' name='busLogo' onChange={(e)=>handleImageChange(e,'busLogo')}/>
    <input type="file" ref={ref4} className='hidden' name='Rec1' onChange={(e)=>handleImageChange(e,'Rec1')}/>
    <input type="file" ref={ref5} className='hidden' name='Rec2' onChange={(e)=>handleImageChange(e,'Rec2')}/>
    <input type="text" className='hidden' value={val.oldImg === '' ? 'empty' : val.oldImg}/>
    <input type="text" className='hidden' value={val.oldImg1 === '' ? 'empty' : val.oldImg1}/>
    <input type="text" className='hidden' value={val.oldImg2 === '' ? 'empty' : val.oldImg2}/>
    <input type="text" className='hidden' value={val.oldImg3 === '' ? 'empty' : val.oldImg3}/>
    <input type="text" className='hidden' value={val.oldImg4 === '' ? 'empty' : val.oldImg4}/>
    </>
  )
}

export default Create