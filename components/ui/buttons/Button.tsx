import React from 'react'

type buttonProps = {
    text:string;
    color?:string;
    bgColor?:string
    classname?:string
}

const Button = ({text , bgColor , color ,classname, ...props}:buttonProps) => {
  return (
    <button {...props} className={`${bgColor} text-${color} ${classname} px-4 text-[15px] rounded-md py-1`}>
        {text}
    </button>
  )
}

export default Button