"use client"
import { addProduct, editProduct } from '@/app/(protected)/product/actions/product';
import useToggle from '@/hooks/stores';
import { useCurrentUser } from '@/hooks/use-current-user';
import { closeModal, fetchData } from '@/lib/functions';
import { url } from '@/lib/url';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr';

type compInput = {
  label: string;
  value: string | number;
  name: string;
  list: string;
  type: string;
  func: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceblur?:(e: React.FocusEvent<HTMLInputElement>) =>void
}

type prodProps = {
  prodItemName: string;
  prodUnitPrice: string // Update type to allow string or number
  prodBus: string;
  prodSince: string;
}


const CompInput: React.FC<compInput> = ({ label, handlePriceblur, value, name, list, type, func }) => {

  const handleFocus = (event:React.FocusEvent<HTMLInputElement>) => event.target.select();

  return (
    <div className='[&>span]:focus-within:text-mainBlue col-span-3 lg:col-span-1 px-3 py-1 pb-3'>
      <span className='text-[12px] font-bold text-slate-400'>{label}</span><br />

      {label === 'Business' ? (
        <>
          <input
            type='text'
            list={list}
            className='w-full text-[13px] outline-none shadow-sm border-full solid
              border-[1px] rounded-md border-slate-200 focus:border-mainLightBlue h-[30px] px-1 bg-[#F8F8F8]'
            name={name}
            value={typeof value === 'string' ? value : value?.toString()}
            onChange={func}
          />
          <datalist id={list}>
            <option value='empty'>empty</option>
            <option value='test'>test</option>
          </datalist>
        </>
      ) : label === 'Unit Price' ? (
        <input type="text" className='w-full text-[13px] outline-none shadow-sm border-full solid 
          border-[1px] rounded-md border-slate-200 focus:border-mainLightBlue h-[30px] px-1 bg-[#F8F8F8]' 
          name={name}
          value={typeof value === 'string' ? value : value?.toString()}
          onChange={func}
          onFocus={handleFocus}
          onBlur={handlePriceblur}
          />
      ) : (
        <input
          type={type}
          className='w-full text-[13px] outline-none shadow-sm border-full solid
            border-[1px] rounded-md border-slate-200 focus:border-mainLightBlue h-[30px] px-1 bg-[#F8F8F8]'
          name={name}
          value={typeof value === 'string' ? value : value?.toString()}
          onChange={func}
        />
      )}
    </div>
  );
};

type createProps ={
  prodItemName:string;
  prodUnitPrice:number | string; // Update type to allow string or number
  prodBus:string;
  prodSince:string;
  proditemDes:string;
}

const Create = () => {
  const { pending , setPending  ,edit , passingId} = useToggle()
  const user = useCurrentUser()

  const    MIN_TEXTAREA_HEIGHT = 32;
  const textareaRef = useRef<any>(null);
  const [text , setText] = useState("")
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)
  useLayoutEffect(()=>{
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
  },[text])
  
  const {data , error} = useSWR(`${url}/api/product/${passingId}?email=${user?.email}`,fetchData)

  const prods:createProps = data?.editProduct || ''

  const [val , setVal] = useState<prodProps>({
    prodItemName:'',
    prodUnitPrice:'', 
    prodBus:'',
    prodSince:'',
  })

  useEffect(()=>{
    setVal({
      prodItemName: edit ? prods.prodItemName : '',
      prodUnitPrice: edit ? (typeof prods.prodUnitPrice === 'number' ? `$${prods.prodUnitPrice.toFixed(2)}` : prods.prodUnitPrice) : '',
      prodBus: edit ? prods.prodBus : '',
      prodSince: edit ? prods.prodSince : '',
    });
    setText(prods.proditemDes)
  },[passingId, edit, prods]);

  const left = useMemo(()=>[
    {
      label:"Item Name",
      type:"text",
      name:'prodItemName',
      val:val.prodItemName,
    },
    {
      label:'Business',
      type:'text',
      name:'prodBus',
      val:val.prodBus
    }
  ],[val.prodItemName , val.prodBus])
  const right = useMemo(()=>[
    {
        label:"Unit Price",
        type:"text",
        name:"prodUnitPrice",
        val:val.prodUnitPrice
    },
    {
        label:"Product Since",
        type:"date",
        name:"prodSince",
        val:val.prodSince
    }
  ],[val.prodUnitPrice , val.prodSince])

  const formatValueWithDollarSign = (value: number): string => {
    return `$${value.toFixed(2)}`;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Ensure prodUnitPrice is always stored as a string
    let newValue: string | number = value;
  
    if (name === 'prodUnitPrice') {
      const parsedValue = parseFloat(value);
      const valueWithoutDollarSign = value.replace(/\$/g, '');
      isNaN(parsedValue) ? '' : valueWithoutDollarSign
    }
  
    setVal({
      ...val,
      [name]: newValue,
    });
  };
  
  const handleProBlur = (e:React.FocusEvent<HTMLInputElement>) =>{
    const value = parseFloat(e.target.value.replace(/\$/g, ''))
    const formattedValue = isNaN(value) ? '' : formatValueWithDollarSign(value)
    setVal({
      ...val,
      prodUnitPrice:formattedValue
    })
  }
  
  
  const onSave = async() =>{
    setPending(true)

    let validation = ''

    const {prodItemName , prodUnitPrice , prodBus , prodSince} = val

    if(!prodItemName || !prodBus){
      validation= "sorry this field is required"
      toast.error(validation)
      setPending(false)
    }else{
       addProduct({
        prodItemName:prodItemName,
        prodUnitPrice:prodUnitPrice,
        prodBus:prodBus,
        prodSince:prodSince,
        proditemDes:text
      }).then((data)=>{
        if(data?.error){
          toast.error(data.error)
          
        }
        if(data?.success){
          toast.success(data.success)
          setPending(false)
        }
      }).catch(()=>{
        toast.error("something went wrong")
      })
    }
  }

  const onUpdate = async() =>{
    setPending(true)

    let validation = ''

    const {prodItemName , prodUnitPrice , prodBus , prodSince} = val

    if(!prodItemName || !prodBus){
      validation= "sorry this field is required"
      toast.error(validation)
      setPending(false)
    }else{
       editProduct({
        id:passingId,
        prodItemName:prodItemName,
        prodUnitPrice:prodUnitPrice,
        prodBus:prodBus,
        prodSince:prodSince,
        proditemDes:text
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
            <CompInput handlePriceblur={handleProBlur} key={item.label} value={item.val} label={item.label} list={item.label} func={handleChange} name={item.name} type={item.type}/>
          )
        })
      }
      </div>
    </div>
    <div className=" flex justify-center pb-[20px] ">
          <div className="[&>span]:focus-within:text-mainBlue w-full px-3">
          <span className={` text-[12px] font-bold text-slate-400`}>Item Description</span><br/>
          <textarea name="itemDes" className="w-full px-1 overflow-y-hidden bg-[#F8F8F8] h-[150px] text-[13px] border-solid border-[1px] shadow-sm   rounded-md border-slate-200 focus:border-mainLightBlue outline-none " onChange={onChange}
          ref={textareaRef}
          style={{
            minHeight: MIN_TEXTAREA_HEIGHT,
            resize: "none"
          }}
          value={text} >

            </textarea>
          </div>
          </div>
    <div className='flex justify-center items-center gap-5'>
    <button className={`px-4 py-1 text-white duration-200 ease-in-out ${val.prodItemName  !== "" || val.prodBus !== "" ? "bg-insomnia-primary text-white" : "bg-slate-300 hover:bg-insomnia-primary"} w-[185px] rounded-md `} onClick={edit ? onUpdate : onSave}>{pending ? <span className='loading loading-spinner text-default'></span> : <p>Save</p>}</button>
      <button className={`px-4 py-1 text-white duration-200 ease-in-out bg-slate-300 hover:bg-mainLightRed w-[185px] rounded-md`} onClick={()=>closeModal('my_modal_5')}>Cancel</button>
    </div>
    </>
  )
}

export default Create;
