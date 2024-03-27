import React from 'react'
import DailySummaries from './DailySummaries'
import HistorySummaries from './HistorySummaries'

const BottomRight = () => {
  return (
    <div className='lg:col-span-1 col-span-6'>
        <DailySummaries/>
        <HistorySummaries/>
    </div>
  )
}

export default BottomRight