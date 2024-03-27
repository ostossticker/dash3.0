"use client"
import React, { useEffect, useState } from 'react'

type numEffectProps = {
    nums:number,
    interval:number,
    classes?:string
    dollarTag?:boolean
}

const NumberEffect = ({dollarTag,nums,interval,classes} : numEffectProps) => {
  const [count , setCount] = useState<number>(0)

  useEffect(()=>{
    const timer = setInterval(()=>{
        if(count < nums){
            setCount((prevCount) => prevCount + 1);
        }else{
            clearInterval(timer);
        }
    },interval)

    return () =>{
        clearInterval(timer)
    }
  },[count , nums , interval])
  return (
    <p className={classes}>
      {dollarTag ? `$${count.toFixed(2)}` : count }
    </p>
  )
}

export default NumberEffect