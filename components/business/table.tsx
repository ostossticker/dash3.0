"use client"
import useToggle from '@/hooks/stores';
import { useCurrentUser } from '@/hooks/use-current-user';
import { areAnagrams, fetchData, openModal } from '@/lib/functions';
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiTrashLight , PiPencilSimpleLineLight } from "react-icons/pi";
import useSWR, { mutate } from 'swr';
import Modal from '../ui/modal/modal';
import { deleteBusiness } from '@/app/(protected)/bussiness/action/business';
import { toast } from 'react-toastify';
import Bustop from './top';
import { useRouter } from 'next/navigation';
import { url } from '@/lib/url';

type businessProps = {
  id:string
  busName:string;
  busDes:string;
  busEmail:string;
}

type Option = {
  id:string;
  busName:string;
  busEmail:string;
}

const BusTable = () => {
  const { isOpen , isHover ,darkMode , pending,setPending,onEdit,setPassingId} = useToggle()
  const user = useCurrentUser()                                            
  const router = useRouter()
  const[page , setPage] = useState(1);
  const [currentPage , setCurrentPage] = useState(1);
  const [take , setTake] = useState<number>(5)
  const [filter , setFilter] = useState('')
  const [suggesting , setSuggest] = useState<Option[]>([])
  const [passing , setPassing] = useState<string>('')
  const anagramFilter:string =''
  const {data , error} = useSWR(`${url}/api/businesstable?email=${user.email}&page=${page}&take=${take}&filter=${filter}`,fetchData)

  const bus:businessProps[] = data?.buses || []
  const totalPages: number = data?.pagination.totalPages || 0;       
             
  const loadPage = (newPage:number) =>{
    setPage(newPage);
    setCurrentPage(newPage);
  }

  const handleFilterChange = (e:React.ChangeEvent<HTMLInputElement>,options:Option[],setSuggests:React.Dispatch<React.SetStateAction<Option[]>>)=>{
    const value = e.target.value
    setFilter(value)
    const filteredOptions = options.filter(op=>areAnagrams(op.busName,value.trim()))
    setSuggests(filteredOptions)
  }

  useEffect(()=>{
    if(!filter ){
      setPage(currentPage)
      mutate(`${url}/api/businesstable?email=${user.email}&page=${currentPage}&take=${take}&filter=${filter}`)
    }
    if(filter !== '' ){
      setPage(1)
      mutate(`${url}/api/businesstable?email=${user.email}&page=1&take=${take}&filter=${filter}`)
    }
  },[filter , take , currentPage,user,pending])


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
  ? bus.filter(buses => areAnagrams(buses.busName, anagramFilter))
  : bus;


  const thead = useMemo(()=>[
    {
      label:"NO." ,
      textAlign:"text-start pl-3"   
    },
    {
      label:"BUSINESS",
      textAlign:"text-start"
    },
    {
      label:"DESCRIPTION",
      textAlign:"text-start"
    },
    {
      label:"EMAIL",
      textAlign:"text-start"
    },
    {
        label:"ACTIONS",
        textAlign:"text-end pr-3"
    }
  ],[])

  if(error) return <div>Error fetching data</div>

  const handleDelete = async (id:string) =>{
    
    setPending(true)
    await deleteBusiness(id)
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

  const placeholderClass = `${isOpen || isHover ? "py-[1px]" : "py-[1px]"} text-start text-[13px]`

  const classes = "bg-[#f79f5f] text-white w-[30px] h-[30px] rounded-md mx-1"

  return (
    <div className={`${darkMode ? "bg-dark-box-color" : "bg-white"} mt-[20px] shadow-md rounded-lg px-[30px] ${isOpen || isHover ? "py-[8px]" : "py-[10px]"}`}>
        <Bustop
        val={filter} 
        setFilter={setFilter}
        func={(e)=>handleFilterChange(e,bus,setSuggest)}
        suggesting={suggesting}
        onclick={()=>setFilter('')}
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
                    <td className={`${placeholderClass} pl-3`}>{i + 1}</td>
                    <td className={placeholderClass}>{item.busName}</td>
                    <td className={placeholderClass}>{item.busDes}</td>
                    <td className={placeholderClass}>{item.busEmail}</td>
                    <td className={`${placeholderClass} pr-3`}>
                        <div className='flex justify-end items-center gap-1'>
                        <button className={`${darkMode ? "text-blue-400" : "text-blue-700" } p-1`} onClick={()=>{
                          openModal('my_modal_5')
                          onEdit()
                          setPassingId(item.id)
                        }}>
                           <PiPencilSimpleLineLight size={20}/>
                        </button>
                        <button className={`${darkMode ? "text-red-400 " : "text-red-700  "}p-1`} onClick={()=>{
                          openModal('business')
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
        <Modal typeSelect='caution' id='business' handlingAction={()=>handleDelete(passing)} CautionText={'do delete action'}/>
    </div>
  )
}

export default BusTable