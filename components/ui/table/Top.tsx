"use client"
import useToggle from '@/hooks/stores'
import React from 'react'
import Modal from '../modal/modal';
import { useRouter } from 'next/navigation';

type topProps = {
  title:string;
  showButtonCreate?:boolean;
  showButtonForm?:boolean;
  classname?:string;
  routing?:string | undefined;
  showCancel?:boolean;
  modalChildren?:JSX.Element;
  topTitle?:string;
  editlabel?:string;
  typeSelect?:string;
  bgLeft?:string;
  bgRight?:string;
  bigModal?:JSX.Element;
}

const Top = ({title,bgLeft,bgRight,bigModal,showButtonCreate,typeSelect,editlabel,showButtonForm,showCancel,modalChildren ,topTitle,routing = ''}:topProps) => {
    const router = useRouter()
    const {darkMode,onCancel} = useToggle()
    const openModal = () => {
      const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
      if (modal) {
        modal.showModal();
      }
    };
  return (
    <>
    <div className='flex justify-between px-1'>
      <h1 className={`font-bold ${darkMode ? "text-dark-lg-color" : ""} text-[30px]`}>{title}</h1>
      {
        showButtonCreate && (
          <button onClick={()=>router.push(routing)} className={`font-bold text-white bg-[#f79f5f] px-3 my-2 rounded-md`}>
            Create
          </button>
        )
      }
      {
        showButtonForm && (
          <button onClick={()=>{
            openModal()
            onCancel()
          }} className={`font-bold text-white bg-[#f79f5f] px-3 my-2 rounded-md`}>
            Create
          </button>
        )
      }
    </div>
    <Modal id='my_modal_5' 
    bigModal={bigModal}
    bgLeft={bgLeft} 
    bgRight={bgRight} 
    typeSelect={typeSelect} 
    title={topTitle} 
    editLabel={editlabel} 
    showCancel={showCancel}>
      {modalChildren}
    </Modal>
    </>
  )
}

export default Top