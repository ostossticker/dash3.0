"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { currencyToWords } from 'dollars2words';
import CurrencyInput from 'react-currency-input-field';
import Button from '../ui/buttons/Button';

const Receipting = () => {
    const [ statecheck  , setStateCheck] =useState<string>("")
    const [datee , setDate] = useState({
        day:'',
        month:'',
        year:'',
    })

    useEffect(()=>{
      const dateV = new Date()
      const day = dateV.getDate().toString().padStart(2,'0');
      const month = (dateV.getMonth() + 1).toString().padStart(2,'0');
      const year = dateV.getFullYear().toString();;
      setDate({day , month , year});
    },[]) 

    const [test , setTest] = useState<string | undefined>('')

    const check = () =>{
        setStateCheck('check')
    }

    const check1 = () =>{
        setStateCheck('check1')
    }

    const check2 = () =>{
        setStateCheck('check2')
    }

    const handleChange = (value: string | undefined) => {
        setTest(value || ''); // If value is undefined, setTest to empty string
    }
    const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let formattedValue = value;
  
      // If changing day or month, enforce two decimal places
      if (name === 'day' || name === 'month') {
          // Remove any non-digit characters
          formattedValue = formattedValue.replace(/\D/g, '');
          // Ensure only the first two characters are kept
          formattedValue = formattedValue.slice(0, 2);
      }
  
      // Parse values to integers
      const dayValue = parseInt(formattedValue, 10);
      const monthValue = parseInt(formattedValue, 10);
  
      // Check if the day exceeds the minimum day value
      const minDay = 1; // Assuming minimum day is 1
      const maxDay = 31; // Assuming maximum day is 31
      if (name === 'day' && (dayValue < minDay || dayValue > maxDay)) {
          // Reset day to today's date
          const today = new Date();
          formattedValue = String(today.getDate()).padStart(2, '0');
      }
  
      // Check if the month exceeds the maximum month value
      const minMonth = 1; // Assuming minimum month is 1
      const maxMonth = 12; // Assuming maximum month is 12
      if (name === 'month' && (monthValue < minMonth || monthValue > maxMonth)) {
          // Reset month to today's date
          const today = new Date();
          formattedValue = String(today.getMonth() + 1).padStart(2, '0');
      }
  
      setDate({
          ...datee,
          [name]: formattedValue
      });
  };

    const date = "h-[50px] w-[100px] border-solid border-solid border-l-[8px] border-y-[8px] border-r-[4px] border-gray-300 "
  const date1 = "h-[50px] w-[100px] border-solid border-solid border-y-[8px]  border-x-[4px] border-gray-300 "
  const date2 = "h-[50px] w-[100px] border-solid border-solid border-r-[8px] border-y-[8px] border-l-[4px] border-gray-300 "

  return (
    <div className=" px-10 pt-10 bg-white" >
            <div  >
            <div className='bg-white '>

              </div>
            <div style={{backgroundImage:"url('/RecImg.png')",backgroundSize:"cover"}} className={`h-[524px] pt-[60px] px-[30px]`} >
            {/***************************/}
            <div className='flex justify-between items-center'>
      
                  <div className='flex justify-center items-center'>
                  <Image src="/n5LOGO.png"  className='w-[210px]' alt="#" width={210} height={210}/>
                  <Image src="/text.png"  className='w-[190px] h-[70px]' alt='#' width={190} height={190}/>
                  </div>
        
                  <Image src="/RecLetter.png"  className='w-[230px] ' alt='#' width={230} height={230}/>
            
                <div>
                
                
                <div className='flex justify-center items-center'>
                  <div className='pt-[13px] text-[24px] pr-[5px] text-end text-slate-400' >
                  <p className='h-[20px]' style={{fontFamily:"khmerContent"}}>កាលបរិច្ឆទ:</p>
                  <p className='h-[20px] pt-[5px]' style={{fontFamily:"khmerContent"}}>Date:</p>
                  </div>
                  <div>
                    <div className='text-center text-[24px] text-slate-400' style={{fontFamily:"khmerContent"}}>
                    លេខ​ /​ No: <span className='text-black'>#1004</span>
                    </div>


                  {
                    /*/////////////////////// date /////////////////////////////////////*/
                   
                  }
                  <input className={`${date} text-[24px] text-center outline-none`} type='number'name='day'  value={datee.day}
                  onChange={dateChange} />
                  <input className={`${date1} text-[24px] text-center outline-none`} type='number' name='month' value={datee.month} 
                  onChange={dateChange}/>
                  <input className={`${date2} text-[24px] text-center outline-none`} type='number' name='year' value={datee.year}
                  onChange={dateChange}/>
                  <div>
                  </div>
                  {
                    /*/////////////////////// date /////////////////////////////////////*/
                  }
                  </div>
                </div>
                </div>
            </div>
            {/***************************/}
            <div className='flex'>
              {/*************************/}
              <div className='w-full'>
              <div className='mt-[20px] mb-[6px]'>
                <p className='text-start text-[24px] h-[23px] text-slate-400 pt-[13px]' style={{fontFamily:"khmerContent"}}>ទទួលពី:</p>
                <div className='flex'>
                  <label className='text-[24px] text-slate-400 pt-[13px]'>Received From:</label>
                  <input className='outline-none border-dotted w-[515px] h-[40px] pt-[3px] pl-[10px] border-b-[3px] border-slate-400 ml-1 text-[24px] ' type="text" style={{background:"none",fontFamily:"khmerContent"}} />
                </div>
              </div>
              <div className='mb-[6px]'>
                <p className='text-start text-[24px] h-[23px] text-slate-400' style={{fontFamily:"khmerContent"}}>ចំនួនប្រាក់:</p>
                <div className='flex'>
                  <label className='text-[24px] w-[138px] text-slate-400'>The Sum of:</label>
                  <span className='border-dotted border-b-[3px] inline-block leading-[0.7em] h-[27px] pl-[10px]  border-slate-400 ml-1 text-[24px] w-[551px]'>
                  {test !== undefined && test.trim() !== '' ? (
                        currencyToWords(parseFloat(test)).length >= 43 
                            ? `${test === " " ? "" : currencyToWords(parseFloat(test)).split(" ").slice(0, 5).join(" ")}`
                            : `${test === " " ? "" : currencyToWords(parseFloat(test)).split(" ").slice(0, 8).join(" ")}`
                    ) : ''}
                  </span>
                </div>
                {
                  test !== undefined ? parseFloat(test) >= 100000 ? (
                    <input type="text" className={`border-dotted border-b-[3px]  inline-block leading-[0.7em] bg-transparent pb-[5px] pl-[137px] mt-[19px] border-slate-400 ml-1 text-[24px] w-[691px] `} value={test !== undefined && test.trim() !== '' ? (
                      currencyToWords(parseFloat(test)).length >= 43
                          ?  `${currencyToWords(parseFloat(test)).split(" ").slice(5).join(" ")}`
                          :  `${currencyToWords(parseFloat(test)).split(" ").slice(8).join(" ")}`
                  ) : ''}/>
                  ) : (
                    <span className={`border-dotted border-b-[3px]  inline-block leading-[0.7em] pb-[10px] pl-[150px] mt-[26px] border-slate-400 ml-1 text-[24px] w-[691px]`}>
                        {test !== undefined && test.trim() !== '' ? (
                              currencyToWords(parseFloat(test)).length >= 43
                                  ?  `${currencyToWords(parseFloat(test)).split(" ").slice(5).join(" ")}`
                                  :  `${currencyToWords(parseFloat(test)).split(" ").slice(8).join(" ")}`
                          ) : ''}
                          
                  </span>
                  ) :"" 
                }
              </div>
              <div className='mb-[6px]'>
                <p className='text-start text-[24px] h-[23px] text-slate-400 pt-[13px]'  style={{fontFamily:"khmerContent"}}>សំរាប់ការចំណាយ:</p>
                <div className='flex text-[20px]'>
                  <label className='text-[24px] text-slate-400 pt-[13px]'>For Payment of:</label>
                  <input className='outline-none border-dotted border-b-[3px] h-[40px] pt-[3px]  pl-[20px] w-[511px] border-slate-400 ml-1 text-[24px]' style={{background:"none",fontFamily:"khmerContent"}} type="text" />
                </div>
              </div>
              {/********************************** */}
              <div className='flex mt-[16px]'>
              <div className='flex text-[24px] items-center '>
                <div className='text-slate-400'>Cash.</div>
                {statecheck === 'check' ? (
                    <Image className='w-[23px] h-[23px]' src="/tickblack.png" alt='#' width={23} height={23}/>
                  ) : (
                    <Image className='w-[23px] h-[23px]' src="/tickgrey.png" onClick={check} alt='#'  width={23} height={23}/>
                  )}
              </div>
              <div className='flex text-[24px] mx-[10px] items-center '>
                <div className='text-slate-400'>/E-Banking.</div>
                {statecheck === 'check1' ? (
                    <Image className='w-[23px] h-[23px]' src="/tickblack.png" alt='#'  width={23} height={23}/>
                  ) : (
                    <Image className='w-[23px] h-[23px]' src="/tickgrey.png" onClick={check1} alt='#'  width={23} height={23}/>
                  )}
              </div>
              <div className='flex text-[24px] mx-[10px] items-center '>
                <div className='text-slate-400'>/Cheque.</div>
                {statecheck === 'check2' ? (
                    <Image className='w-[23px] h-[23px]' src="/tickblack.png"   alt='#'  width={23} height={23}/>
                  ) : (
                    <Image className='w-[23px] h-[23px]' src="/tickgrey.png" onClick={check2} alt='#'  width={23} height={23}/>
                  )}
              </div>
              <div className='flex text-[24px]'>
                <div className='text-slate-400'>No.</div>
                <div className='border-dotted border-b-[3px] border-slate-400 w-[244px] ml-1'></div>
              </div>
              </div>
              </div>
              {/*************************/}
              {/*************************/}
              <div className='flex justify-end ml-[30px]'>
                  <div>
                    <div className='flex my-[20px] border-[2px] border-gray-400 h-[70px] bg-white'>
                      <p className=' h-[70px] text-[40px] text-center relative bottom-1 z-20 pl-[10px] font-bold pt-[8px]'>USD</p>
                    <CurrencyInput
                    defaultValue={test}
                    onValueChange={handleChange}
                    className='w-[300px] text-center text-[30px] font-bold outline-none bg-transparent'
                    />
                    </div>
                  <div className='border-dashed border-[2px] border-slate-300 bg-white w-[400px] pt-[10px] h-[200px]'>
                      <p className='text-center text-slate-400' style={{fontFamily:"khmerContent"}}>ហត្ថលេខាអ្នកទទួល / Receiver Signature</p>
                  </div>
                  </div>
              </div>
              {/*************************/}
            </div>
            {/***************************/}
              </div>
              <div className="bg-white h-[127.5px]">

              </div>
            </div>

            <div className='flex justify-end'>
            <div  className='flex gap-2 items-center'>
            <select className=' w-[30px] text-center bg-red-500 text-white h-[29px] rounded-md'>
                <option value="">1</option>
                <option value="">2</option>
            </select>
            <Button bgColor='bg-red-500' color='white' text='Cancel'/>
            <Button bgColor='bg-red-500' color='white' text='PDF'/>
            <Button bgColor='bg-red-500' color='white' text='Print!'/>
            </div>
            </div>

           </div>
  )
}

export default Receipting