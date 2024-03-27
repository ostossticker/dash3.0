import Table from '@/components/ui/table/Table'
import Top from '@/components/ui/table/Top'
import React from 'react'

const page = () => {
  return (
    <>
    <Top routing='/invoice/created' title='Invoice' showButtonCreate/>
    <Table/>
    </>
  )
}

export default page