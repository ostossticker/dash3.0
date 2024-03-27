import InvTop from '@/components/invoice/InvTop'
import InvTable from '@/components/invoice/invTable'
import Top from '@/components/ui/table/Top'
import React from 'react'

const page = () => {
  return (
    <>
    <Top routing='/invoice/created' title='Invoice' showButtonCreate/>
    <InvTable>
      <InvTop/>
    </InvTable>
    </>
  )
}

export default page