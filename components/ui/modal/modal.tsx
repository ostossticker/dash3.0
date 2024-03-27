"use client"
import useToggle from '@/hooks/stores';
import React, { useEffect} from 'react'

type modalProps = {
    children?:React.ReactNode;
    title?:string;
    id:string;
    showCancel?:boolean;
    typeSelect?:string
    handlingAction?:()=>void
    CautionText?:string;
    editLabel?:string;
    bgLeft?:string;
    bgRight?:string;
    bigModal?:JSX.Element;
}

const Modal = ({handlingAction , bigModal  ,CautionText,children,title,bgLeft ,bgRight,editLabel,id,showCancel,typeSelect}:modalProps) => {
  const { darkMode ,pending,edit, setModal ,bgModal} =useToggle()

  const closeModal = () => {
    const modal = document.getElementById(id as string) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  useEffect(()=>{
    setModal('bgLeft')
  },[])

  return (
    <>
      <dialog id={id} className="modal">
        <div className={`modal-box !w-[auto]  ${darkMode ? "bg-dark-box-color" : ""}`}>
          {
            typeSelect === "caution" ? (
              <>
              <div className='flex justify-center items-center pb-[10px] border-b border-slate-300 mx-1'>
              <h3 className={`font-bold text-lg  ${darkMode ? "text-dark-lg-color" : "text-dark-box-color"}`}>You about to {CautionText}</h3>
              </div>
              <div className="modal-action mt-[20px] flex justify-center ">
                <div className='flex gap-2'>
                <button onClick={handlingAction} className='bg-green-400 w-[80px] rounded-md font-semibold'>{pending ? <span className='loading loading-spinner text-default'></span> : <span>Yes</span>}</button>
                <button onClick={closeModal} className='bg-red-400 w-[80px] rounded-md font-semibold'>No</button>
                </div>
                
              </div>
              </>
            ) : typeSelect === 'bigmodal' ? (
              <>
                <div className='flex items-center pb-[10] border-b border-slate-300 mx-1 '>
                  <div className={`text-start mr-2  font-bold text-lg cursor-pointer ${darkMode ? "text-dark-lg-color" : "text-dark-box-color"} ${bgModal === "bgLeft" ? "!text-insomnia-primary" : ""}`} onClick={()=>setModal('bgLeft')}><h3>{bgLeft}</h3></div>
                  <div className={`text-start ml-[75px]  font-bold text-lg cursor-pointer ${darkMode ? "text-dark-lg-color" : "text-dark-box-color"} ${bgModal === "bgRight" ? "!text-insomnia-primary" : ""}`} onClick={()=>setModal('bgRight')}><h3>{bgRight}</h3></div>
                </div>
              <div className='flex justify-center  modal-action mt-[20px]'>
                  <div>
                    {bigModal}
                  </div>
              </div>
              </>
            ) : (
              <>
              <div className='flex justify-between pb-[10px] border-b border-slate-300 mx-1'>
              <h3 className={`font-bold text-lg  ${darkMode ? "text-dark-lg-color" : "text-dark-box-color"}`}>{edit ? editLabel : title}</h3>
              {
                showCancel && (
                  <button onClick={closeModal} className='bg-red-400 w-[25px] h-[25px] rounded-md text-white font-bold'>x</button>
                )
              }
              </div>
              <div className="modal-action mt-[20px] flex justify-center ">
                <div>
                {children}
                </div>
                
              </div>
              </>
            )
          }
        </div>
      </dialog>
    </>
  )
}

export default Modal