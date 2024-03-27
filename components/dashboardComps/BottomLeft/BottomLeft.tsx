import React from 'react'
import Table from './Table'
import Charts from './Chart'
import Bud from './Bud'

const BottomLeft = () => {
  return (
    <div className='lg:col-span-3 col-span-6'>
      <div className='flex'>
      <Charts/>

      <Bud/>
      </div>
      <Table/>
    </div>
  )
}

export default BottomLeft