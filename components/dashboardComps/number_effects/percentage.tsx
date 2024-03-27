import React, { useEffect, useState } from 'react'

type percentageProps = {
  nums:number,
  interval:number,
  classes?:string
}

const Percentage = ({nums , interval , classes} : percentageProps) => {
  const [count , setCount] = useState<number>(0)

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(count < nums){
        setCount((prev)=>prev + 1);
      }else{
        clearInterval(timer)
      }
    },interval)

    return () =>{
      clearInterval(timer)
    }

  },[count , nums , interval])
  return (
    <p className={classes}>
      {count}%
    </p>
  )
}

export default Percentage