import Create from '@/components/purchase/create'
import PurTable from '@/components/purchase/table'
import Purtop from '@/components/purchase/top'
import Table from '@/components/ui/table/Table'
import Top from '@/components/ui/table/Top'
import React from 'react'

const page = () => {
  return (
    <>
    <Top topTitle='NEW PURCHASE' editlabel='EDIT PURCHASE' showCancel={false} title='Purchase' modalChildren={<Create/>} showButtonForm/>
    <PurTable/>
    </>
  )
}

export default page