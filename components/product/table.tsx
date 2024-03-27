"use client"
import { deleteProduct } from '@/app/(protected)/product/actions/product';
import useToggle from '@/hooks/stores';
import { useCurrentUser } from '@/hooks/use-current-user';
import { areAnagrams, fetchData, openModal } from '@/lib/functions';
import React, { useEffect, useMemo, useState } from 'react'
import { PiTrashLight , PiPencilSimpleLineLight } from "react-icons/pi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import Prodtop from './top';
import Modal from '../ui/modal/modal';
import axios from 'axios';
import { url } from '@/lib/url';

type prodProps = {
  id:string;
  prodItemName:string;
  prodUnitPrice:string;
  prodBus:string;
  prodSince:string;
  proditemDes:string;
  cusTelegram:string;
}

type Option = {
  id:string;
  prodBus:string;
}

const ProdTable = () => {
  const { isOpen , isHover ,darkMode , pending,setPending,onEdit,setPassingId} = useToggle()
  const user = useCurrentUser()
  
  const[page , setPage] = useState(1);
  const [currentPage , setCurrentPage] = useState(1);
  const [take , setTake] = useState<number>(5)
  const [filter , setFilter] = useState('')
  const [filter1 , setFilter1] = useState('')
  const [test , setTest] = useState<prodProps[]>([])
  const [suggesting , setSuggest] = useState<Option[]>([])
  const [passing , setPassing] = useState<string>('')
  const anagramFilter:string =''
  const {data , error} = useSWR(`${url}/api/producttable?email=${user.email}&page=${page}&take=${take}&filter=${filter}&filter1=${filter1}`,fetchData)

  const prods:prodProps[] = data?.products || []
  const totalPages: number = data?.pagination.totalPages || 0;

  const loadPage = (newPage:number) =>{
    setPage(newPage);
    setCurrentPage(newPage);
  }

  const handleFilterChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFilter(e.target.value)
  }
  const handleFilterChange1 = (e:React.ChangeEvent<HTMLInputElement>,option:Option[],setSuggest:React.Dispatch<React.SetStateAction<Option[]>>)=>{
    const value = e.target.value
    setFilter1(value)
    const filteredOptions = option.filter(op=>op.prodBus,value.trim())
    setSuggest(filteredOptions)
  }

  useEffect(()=>{
    if(!filter || !filter1){
      setPage(currentPage)
      mutate(`${url}/api/producttable?email=${user.email}&page=${currentPage}&take=${take}&filter=${filter}&filter1=${filter1}`)
    }
    if(filter !== '' || filter1 !== ''){
      setPage(1)
      mutate(`${url}/api/producttable?email=${user.email}&page=1&take=${take}&filter=${filter}&filter1=${filter1}`)
    }
    const fetchData = async () =>{
      const {data} = await axios.get(`${url}/api/products?email=${user.email}&filter=${filter1}`)
      setTest(data)
    }
    fetchData()
  },[filter , take , currentPage,user,pending,filter1,])

  const renderPageNumbers = () =>{
        const maxPagesToShow = 3;
        const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage < startPage) {
            return [];
        }

        return [...Array(endPage - startPage + 1).keys()].map(
            (index) => startPage + index
        );
  }

  const filteredUsers = anagramFilter
  ? prods.filter(prod => areAnagrams(prod.prodItemName, anagramFilter))
  : prods;
  
  const thead = useMemo(()=>[
    {
      label:"NO." ,
      textAlign:""   
    },
    {
      label:"ITEM NAME",
      textAlign:""
    },
    {
      label:"DESCRIPTION",
      textAlign:""
    },
    {
      label:"BUSINESS",
      textAlign:""
    },
    {
      label:"UNIT PRICE",
      textAlign:""
    },
    {
        label:"ACTIONS",
        textAlign:""
    }
  ],[])

  if(error) return <div>Error fetching data</div>

  const handleDelete = async (id:string) =>{
    
    setPending(true)
    await deleteProduct(id)
    .then((data)=>{
      if(data?.success){
        toast.success(data.success)
        setPending(false)
      }      
      if(data?.error){
        toast.error(data.error)
        setPending(false)
      }
    }).catch(()=>{
      toast.error('error')
      setPending(false)
    })
  }

  const placeholderClass = `${isOpen || isHover ? "py-[1px]" : "py-[1px]"} text-center text-[13px]`

  const classes = "bg-[#f79f5f] text-white w-[30px] h-[30px] rounded-md mx-1"

  return (
    <div className={`${darkMode ? "bg-dark-box-color" : "bg-white"} mt-[20px] shadow-md rounded-lg px-[30px] ${isOpen || isHover ? "py-[8px]" : "py-[10px]"}`}>
        <Prodtop
        suggesting={suggesting}
        setFilter={setFilter1}
        val={filter} 
        func={handleFilterChange}
        val1={filter1}
        func1={(e)=>handleFilterChange1(e,test,setSuggest)}
        onclick={()=>{
          setFilter('')
          setFilter1('')
        }}
        />
        <table className='w-full mt-[10px]'>
            <thead>
              <tr>
                {
                  thead?.map((item)=>{
                    return(
                      <th key={item.label} className={`${item.textAlign} text-white bg-[#f79f5f] text-[15px]`}>{item.label}</th>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                filteredUsers?.map((item,i)=>{
                  return(
                  <tr key={item.id} className={darkMode ? `${i % 2 === 0 ? ' bg-dark-box-color ' : 'bg-dark-table-row'} text-dark-lg-color` : `${i % 2 === 0 ? 'bg-white' : ' bg-gray-100'}`}>
                    <td className={placeholderClass}>{(page - 1) * take + i + 1}</td>
                    <td className={placeholderClass}>{item.prodItemName}</td>
                    <td className={placeholderClass}>{item.proditemDes}</td>
                    <td className={placeholderClass}>{item.prodBus}</td>
                    <td className={placeholderClass}>${parseFloat(item.prodUnitPrice).toFixed(2)}</td>

                    <td className={placeholderClass}>
                        <div className='flex justify-center items-center gap-1'>
                        <button className={`${darkMode ? "text-blue-400" : "text-blue-700" } p-1`} onClick={()=>{
                          openModal('my_modal_5')
                          onEdit()
                          setPassingId(item.id)
                        }}>
                           <PiPencilSimpleLineLight size={20}/>
                        </button>
                        <button className={`${darkMode ? "text-red-400 " : "text-red-700  "}p-1`} onClick={()=>{
                          openModal('products')
                          setPassing(item.id)
                        }}>
                            <PiTrashLight size={20}/>
                        </button>
                        </div>
                    </td>
                  </tr>
                  )
                })
              }
              {
                (()=>{
                  let row = []
                  for(let i = take; i > filteredUsers.length; i--){
                    row.push(
                      <tr key={i * Date.now()} className={darkMode ? `${i % 2 === 0 ? '  bg-dark-table-row' : 'bg-dark-box-color'} text-dark-lg-color` : `${i % 2 === 0 ? ' bg-gray-100' : ' bg-white'}`}>
                        <td className={placeholderClass}><div className='invisible'>-</div></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                        <td className={placeholderClass}></td>
                      </tr>
                    )
                  }
                  return row;
                })()
              }
            </tbody>
        </table>
        {/****************** */}
        <div className='flex justify-between pb-[14px]'>
          
        <div className='flex justify-center px-[5px] rounded-md items-center mt-[16px] bg-[#f79f5f] h-[30px] text-white'>
        <select value={take} className='bg-transparent outline-none' onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setTake(Number(e.target.value))}>
              <option value="5" className='text-black'>5</option>
              <option value="10" className='text-black'>10</option>
              <option value="20" className='text-black'>20</option>
          </select><MdOutlineArrowDropDown/>
            </div>
          <div className='flex mt-[16px]'>
            <button className={classes} onClick={() => loadPage(1)} disabled={page === 1}>{"<<"}</button>
            <button className={classes} onClick={() => loadPage(page - 1)} disabled={page === 1}>{"<"}</button>
            {renderPageNumbers().map((pageNumber) => (
                <button key={pageNumber}  
                className={classes}
                onClick={() => loadPage(pageNumber)}
                disabled={page === pageNumber}
                >
                  {pageNumber}
                </button>
            ))}
            <button className={classes}  onClick={() => loadPage(page + 1)}
          disabled={page === totalPages}>{">"}</button>
            <button className={classes} onClick={() => loadPage(totalPages)} disabled={page === totalPages}>{">>"}</button>
          </div>
          
        </div>
        {/****************** */}
        <Modal typeSelect='caution' id='products' handlingAction={()=>handleDelete(passing)} CautionText={'do delete action'}/>
    </div>
  )
}

export default ProdTable