import Table from '@/components/ui/table/Table'
import Top from '@/components/ui/table/Top'
import React from 'react'

const page = () => {
  return (
    <>
    <Top topTitle='NEW EMPLOYEE' editlabel='EDIT EMPLOYEEE' modalChildren={<div>r</div>} showCancel={false} title='Employee' showButtonForm/>
    <Table/>
    </>
  )
}

export default page