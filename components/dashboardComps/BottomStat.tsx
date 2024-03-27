import React from 'react'
import BottomRight from './BottomRight/BottomRight'
import BottomLeft from './BottomLeft/BottomLeft'

const BottomStat = () => {
  return (
    <div className='grid grid-cols-4 gap-10 mt-[40px]'>
        <BottomLeft/>
        <BottomRight/>
    </div>
  )
}

export default BottomStat