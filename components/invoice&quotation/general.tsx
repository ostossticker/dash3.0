"use client"
import useToggle from "@/hooks/stores";
import React, { useRef, useState } from "react";
import { PiCopySimpleLight } from "react-icons/pi";
import { PiTrashLight } from "react-icons/pi";
import { toast } from "react-toastify";
import InvoiceForm from './invoice_form'
import Invprint from "./PrintForms/Invoice";
import ReactToPrint from "react-to-print";

type generalProps = {
  busType:string | undefined;
  ////invoice form
  cusName:string;
  cusComp:string;
  cusPhone:string;
  cusEmail:string;
  cusAddr:string;
  invBus:string;
  invNo:string;
  invPo:string;
  invTitle:string;
  invDate:string;
  partial:number;
  discount:number;
  invStatus:string;
  ///business
  abaName?:string;
  abaNumber?:string;
  ////toggleStuff
  toggleEmail?:boolean;
  togglePo?:boolean;
  toggleAddr?:boolean;
}

type Calculation = {
  id:string;
  description: string;
  quantity: string;
  unitPrice: string;
  total: string;
  
}

const General = ({busType,toggleEmail , toggleAddr , togglePo , cusName,cusComp,cusPhone , abaName , abaNumber ,invStatus , partial , discount, cusEmail , cusAddr, invBus , invNo , invPo , invTitle , invDate}:generalProps) => {
  const printableComponent = useRef<any>()
  const [focus , setFocus] = useState<number | null>(null)
  const {darkMode , pending , setPending} = useToggle()
  const [calculations, setCalculations] = useState<Calculation[]>([
    {
      id:"",
      description: "",
      quantity: "",
      unitPrice: "",
      total: ""
    }
  ]);

  const handleCopy = (
    description: string,
    quantity: string,
    unitPrice: string,
    total: string
  ) => {
    if (calculations.length < 12) {
        const newItem = {
          id:crypto.randomUUID(),
          description,
          quantity,
          unitPrice,
          total
        };
      
        // Add the newItem to the calculations array
        setCalculations(prevCalculations => [...prevCalculations, newItem]);
      } else {
        // Display a message or handle the case where the limit is reached
        console.log('Cannot add more than 12 calculations.');
      }
  };

  const handleAddCalculation = () => {
    if (calculations.length < 12) {
      setCalculations([
        ...calculations,
        {
          id:crypto.randomUUID(),
          description: "",
          quantity: "",
          unitPrice: "",
          total: ""
        }
      ]);
    } else {
      // Display a message or handle the case where the limit is reached
      console.log('Cannot add more than 12 calculations.');
    }
  };

  const handleRemoveCalculation = (index: number) => {
    const updatedCalculations = [...calculations];
    updatedCalculations.splice(index, 1);
    setCalculations(updatedCalculations);
  };
  
  const formatUnitPrice = (value: string): string => {
    // Remove the dollar sign if present
    const valueWithoutDollarSign = value.replace(/\$/g, '');
    
    if (valueWithoutDollarSign.trim() === '') {
        return ''; // Return empty string if the input value is empty after removing the dollar sign
    }
    
    const parsedValue = parseFloat(valueWithoutDollarSign);
    if (!isNaN(parsedValue)) {
        return parsedValue.toFixed(2);
    }
    return ''; // Return empty string if the input value is not a valid number
};
const formatTotal = (value: string): string => {
  // Remove the dollar sign if present
  const valueWithoutDollarSign = value.replace(/\$/g, '');
  
  if (valueWithoutDollarSign.trim() === '') {
      return ''; // Return empty string if the input value is empty after removing the dollar sign
  }
  
  const parsedValue = parseFloat(valueWithoutDollarSign);
  if (!isNaN(parsedValue)) {
      return parsedValue.toFixed(2);
  }
  return ''; // Return empty string if the input value is not a valid number
};

  const handleChange = (index: number, field: keyof Calculation, value: string | number) => {
    setCalculations(prevCalculations => {
      const updatedCalculations = [...prevCalculations];
      const updatedCalculation = { ...updatedCalculations[index] };
  
      if (field === 'description') {
        updatedCalculation[field] = value as string; // Set description directly
     }else if (field === "quantity"){
        updatedCalculation[field] = value as string
     } else if (field === 'unitPrice' || field === 'total') {
        // Remove $ sign if present and convert to float
        const unitPriceString = (value as string).replace(/\$/g, '');
        if (unitPriceString === '') {
          updatedCalculation[field] = ''; // Set unitPrice to empty if value is empty after removing the dollar sign
      } else {
          updatedCalculation[field] = `$${unitPriceString}`; // Add dollar sign to unitPrice and total
      }
    }
  
  
   
    const quantity = updatedCalculation.quantity;
    const unitPrice = parseFloat(updatedCalculation.unitPrice.replace(/\$/g, ''));
    if (!quantity) {
        if (!isNaN(unitPrice)) {
            updatedCalculation.total = `$${unitPrice.toFixed(2)}`;
        } else {
            updatedCalculation.total = '';
        }
    } else if (quantity !== '' || !isNaN(unitPrice)) {
        if(quantity.match(/\./g)){
          setFocus(index)
        }else{
          setFocus(null)
        }
        updatedCalculation.total = `$${(parseInt(quantity.replace(/\./g , '')) * unitPrice).toFixed(2)}`;
    }
      

      // Handle NaN total
      if (isNaN(parseFloat(updatedCalculation.total.replace(/\$/g, '')))) {
        updatedCalculation.total = '';
    }
  
      updatedCalculations[index] = updatedCalculation;
      return updatedCalculations;
    });
  };
  
  const handleLiClick = (index:number , field:keyof Calculation, value:string | number , op:string) =>{
    setCalculations(prev =>{
      const updatedCalculations = [...prev];
      const updatedCalculation = { ...updatedCalculations[index] };

      if(field === "quantity"){
        if(op === "pcs"){
          if(parseInt((value as string).replace(/\./g, '')) === 1){
            updatedCalculation[field] = (value as string).replace(/\./g, '') + "pc"
          }else{
            updatedCalculation[field] = (value as string).replace(/\./g, '') + op
          }
        }else{
          updatedCalculation[field] = (value as string).replace(/\./g, '') + op
        }
      }

      updatedCalculations[index] = updatedCalculation;
      return updatedCalculations;
    })
    setFocus(null)
  }
  

  const handleUnitPriceBlur = (value: string, index: number) => {
    if (value.trim() === '') {
        console.log('Value is empty, setting unitPrice to empty');
        handleChange(index, 'unitPrice', ''); 
    } else {
        const formattedValue = formatUnitPrice(value);
        console.log('Formatted Value:', formattedValue);
        const parsedValue = parseFloat(formattedValue);
        console.log('Parsed Value:', parsedValue);
        if (!isNaN(parsedValue)) {
            const formattedNumber = parsedValue.toFixed(2);
            console.log('Formatted Number:', formattedNumber);
            handleChange(index, 'unitPrice', formattedNumber); 
        } else {
            handleChange(index, 'unitPrice', ''); 
        }
    }
  };
  
  const handleUnitPriceKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, value: string, index: number) => {
    if (event.key === 'Enter') {
        if (value.trim() === '') {
            console.log('Value is empty, setting unitPrice to empty');
            handleChange(index, 'unitPrice', ''); 
        } else {
            const formattedValue = formatUnitPrice(value);
            console.log('Formatted Value:', formattedValue);
            const parsedValue = parseFloat(formattedValue);
            console.log('Parsed Value:', parsedValue);
            if (!isNaN(parsedValue)) {
                const formattedNumber = parsedValue.toFixed(2);
                console.log('Formatted Number:', formattedNumber);
                handleChange(index, 'unitPrice', formattedNumber); 
            } else {
                handleChange(index, 'unitPrice', ''); 
            }
        }
    }
  };

  const handleTotalChange = (index: number, value: string) => {
    setCalculations(prevCalculations => {
      const updatedCalculations = [...prevCalculations];
      const updatedCalculation = { ...updatedCalculations[index] };
      if (updatedCalculation.unitPrice !== "") {
          updatedCalculation.total = '';
      } else {
          const valueWithoutDollarSign = value.replace(/\$/g, '');

          if (valueWithoutDollarSign === '') {
              updatedCalculation.total = '';
          } else {
              updatedCalculation.total = `$${valueWithoutDollarSign}`;
          }
      }

      updatedCalculations[index] = updatedCalculation;
      return updatedCalculations;
  });
  };
  

  const calculateGrandTotal = () => {
    return calculations.reduce((acc, curr) => acc + parseFloat(curr.total.replace(/\$/g, '') || '0'), 0).toFixed(2);
};

const calculateBalance = () => {
  let grandTotalNumber: number = parseFloat(calculateGrandTotal());
  let balance = 0;

  let partialNumber: number = parseFloat(partial.toString().replace(/\$/g, ''));
  let discountNumber: number = parseFloat(discount.toString().replace(/\$/g, ''));

  if (isNaN(grandTotalNumber) || isNaN(partialNumber) || isNaN(discountNumber)) {
    return '0';
  }


  if (invStatus === "partial") {
    balance = grandTotalNumber - partialNumber;
  } else if (invStatus === "discount") {
    balance = grandTotalNumber - partialNumber - discountNumber;
  }
  return balance.toFixed(2);
};

const handleTotalBlur = (index: number, value: string) => {
  if(value.trim() === ''){
    handleTotalChange(index,'')
  }else{
    const formattedValue = formatTotal(value)
    const parsedValue = parseFloat(formattedValue)
    if(!isNaN(parsedValue)){
      handleTotalChange(index,formattedValue)
    }else{
      handleTotalChange(index , '')
    }
  }
};

const handleTotalKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number, value: string) => {
  if (event.key === 'Enter') {
    if(value.trim() === ''){
      handleTotalChange(index,'')
    }else{
      const formattedValue = formatTotal(value)
      const parsedValue = parseFloat(formattedValue)
      if(!isNaN(parsedValue)){
        handleTotalChange(index,formattedValue)
      }else{
        handleTotalChange(index , '')
      }
    }
  }
};

  const handleDragStart = (e: React.DragEvent<HTMLDivElement | HTMLTableRowElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const updatedRows = [...calculations];
    const draggedRow = updatedRows.find((row) => row.id === draggedId);
    if (!draggedRow) return;
    const targetIndex = updatedRows.findIndex((row) => row.id === targetId);
    updatedRows.splice(updatedRows.indexOf(draggedRow), 1);
    updatedRows.splice(targetIndex, 0, draggedRow);
    setCalculations(updatedRows);
  };

  const generals = [
    {
      label:"NO.",
      clss:""
    },
    {
      label:"DESCRIPTION",
      clss:""
    },
    {
      label:"QUANTITY",
      clss:""
    },
    {
      label:"UNITPRICE",
      clss:""
    },
    {
      label:"TOTAL",
      clss:""
    },
    {
      label:"ACTIONS",
      clss:""
    }
  ]

  const save = () =>{
    setPending(true)

    let validation = ''

    if(!cusName || !cusPhone){
      validation = "sorry this field is required"
      toast.error(validation)
      setPending(false)
    }else {
      alert(JSON.stringify({
        cusName,
        cusComp,
        item:calculations
      }))
    }
  }

  const buttons = [
    {
      label:"RECEIPT",
      func:()=>{}
    },
    {
      label:"PDF",
      func:()=>{}
    },
    {
      label:"PRINT",
      func:()=>{}
    },
    {
      label:"SAVE",
      func:save
    },
    {
      label:"CANCEL",
      func:()=>{}
    }
  ]

  

  return (
    <>
    <div className={`${busType === 'general' ? "block" : "hidden"}`}>
      <div className={`overflow-x-auto mt-[20px] ${darkMode ? "bg-dark-box-color" : "bg-white"} p-[24px] rounded-lg shadow-md`}>
      <table className="w-full">
        <thead>
            <tr>
                {
                  generals.map((item)=>{
                    return(
                      <th key={item.label} className={`${item.clss} ${darkMode ? "text-dark-lg-color" : "" } py-2`}>
                        {item.label}
                      </th>
                    )
                  })
                }
            </tr>
        </thead>
        <tbody>
        {calculations.map((item, index) => (
        <tr key={item.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item.id)}
            onDragStart={(e) => handleDragStart(e, item.id)}
        >
          <td className="py-2 px-[10px]"
          >
            <div
                className={`cursor-grabbing flex justify-center items-center border py-1 border-insomnia-primary w-[34px] rounded-md ${
                  darkMode ? 'text-dark-lg-color' : ''
                }`}
                draggable // Make the div draggable
                onDragStart={(e) => {
                  const target = e.target as HTMLElement; // Cast the target to HTMLElement
                  const tableRow = target.parentNode?.parentNode as HTMLTableRowElement; // Get the table row
                  if (tableRow) {
                    e.dataTransfer.setDragImage(tableRow, 0, 0); // Set the table row as the drag image
                  }
                  handleDragStart(e, item.id);
                }}
              >
              {index + 1}
            </div>
          </td>
          <td className=" px-[10px] py-2">
          <input
              type="text"
              className={`${darkMode ? "text-dark-lg-color" : ""} border xl:w-[700px] 2xl:w-[1100px] px-2 py-1 bg-transparent border-insomnia-primary rounded-md`}
              value={item.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
            />
          </td>
          <td className="px-[10px] py-2">
          <input
              type="text"
              value={item.quantity === "" ? '' : item.quantity}
              onChange={(e) => handleChange(index, 'quantity', e.target.value)}
              className={`${darkMode ? "text-dark-lg-color" : ""} w-full border px-2 py-1 bg-transparent border-insomnia-primary rounded-md`}
            />
            <div className="relative w-[200px]">
            {
              focus === index && (
                <ul className="absolute z-50">
                  <li className="cursor-pointer" onClick={()=>handleLiClick(index , 'quantity' , item.quantity , 'pcs')}>pcs</li>
                  <li className="cursor-pointer" onClick={()=>handleLiClick(index , 'quantity' , item.quantity , 'unit')}>unit</li>
                </ul>
              )
            }
            </div>
          </td>
          <td className="px-[10px] py-2">
          <input
              type="text"
              value={item.unitPrice === '' ? '' : item.unitPrice}
              onChange={(e) => handleChange(index, 'unitPrice', e.target.value)}
              onBlur={(e) => handleUnitPriceBlur(e.target.value, index)}
              onKeyDown={(e) => handleUnitPriceKeyDown(e, e.currentTarget.value, index)}
              className={`${darkMode ? "text-dark-lg-color" : ""} w-full border px-2 py-1 bg-transparent border-insomnia-primary rounded-md`}
            />
          </td>
          <td className="px-[10px] py-2">
          <input
              type="text"
              value={item.total === '' ? '' : item.total}
              onBlur={(e) => handleTotalBlur(index, e.target.value)}
              onKeyDown={(e) => handleTotalKeyDown(e, index, item.total)}
              onChange={(e) => handleTotalChange(index, e.target.value)}
              className={`${darkMode ? "text-dark-lg-color" : ""} w-full border px-2 py-1 bg-transparent border-insomnia-primary rounded-md`}
            />
          </td>
          <td className=" px-[10px] py-2">
          <div className={`flex justify-center items-center gap-2`}>
            <button className={`${darkMode ? "text-blue-400" : "text-blue-700"} border border-insomnia-primary p-1 rounded-md`} onClick={()=>handleCopy(item.description , item.quantity, item.unitPrice,item.total)}><PiCopySimpleLight size={25}/></button>
            <button className={`${darkMode ? "text-red-400" : "text-red-700"} border border-insomnia-primary p-1 rounded-md`} onClick={() => handleRemoveCalculation(index)}><PiTrashLight size={25}/></button>
          </div>
          </td>
        </tr>
      ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-[8px]">
      <button onClick={handleAddCalculation} className={`${darkMode ? "text-dark-lg-color" : ""} ml-[10px] border border-insomnia-primary rounded-md px-[20px] py-[5px] text-[18px] font-bold`}>Add</button>
      <div className={`${darkMode ? "text-dark-lg-color" : ""} border border-insomnia-primary rounded-md px-[20px] py-[5px] flex text-[18px] mr-[10px]`}>
      {
          invStatus === "partial" ? (
            <>
            Balance: <p className="pl-[5px]  font-bold">${calculateBalance()}</p> 
            <div className="w-[2px] bg-insomnia-primary mx-1 h-auto"></div>
            Partial: <p className="pl-[5px]  font-bold">${isNaN(partial) ? 0.00 : partial}</p> 
             <div className="w-[2px] bg-insomnia-primary mx-1 h-auto"></div>
             Grand Total: <p className="pl-[5px]  font-bold">${calculateGrandTotal()}</p>
            </>
          ) : invStatus === "discount" ? (
            <>
            Balance: <p className="pl-[5px]  font-bold">${calculateBalance()}</p> 
            <div className="w-[2px] bg-insomnia-primary mx-1 h-auto"></div>
            Discount: <p className="pl-[5px]  font-bold">${isNaN(discount) ? 0.00 : discount}</p> 
            <div className="w-[2px] bg-insomnia-primary mx-1 h-auto"></div>
            Partial: <p className="pl-[5px]  font-bold">${isNaN(partial) ? 0.00 : partial}</p> 
            <div className="w-[2px] bg-insomnia-primary mx-1 h-auto"></div>
            Grand Total: <p className="pl-[5px]  font-bold">${calculateGrandTotal()}</p>
            </>
          ) : (
            <>
            Grand Total: <p className="pl-[5px]  font-bold">${calculateGrandTotal()}</p>
            </>
          )
        }
        </div>
      </div>


      </div>
      <div className="flex mt-[20px] justify-between">
       <div className="rounded-md">
        <h1 className="rounded-t-md text-white bg-insomnia-primary py-1 font-bold px-[24px]">NOTE</h1>
      <div className="py-1 px-[24px] bg-white rounded-b-md">
      <textarea className="w-[300px] outline-none"></textarea>
      </div>
     </div>
     <div className="flex gap-3">
     {
            buttons.map((item)=>{
              return(
                <React.Fragment key={item.label}>
                  {
                    item.label !== "PRINT" ? (
                      <button className={`bg-insomnia-primary text-dark-lg-color h-[35px] px-2 font-bold text-[20px] w-[120px] rounded-md`} onClick={item.func} >{item.label}</button>
                    ) : (
                      <ReactToPrint
                      trigger={()=>(<button className={`bg-insomnia-primary text-dark-lg-color h-[35px] px-2 font-bold text-[20px] w-[120px] rounded-md`} onClick={item.func} >{item.label}</button>)}
                      content={()=>printableComponent.current}
                      pageStyle="@page {size: A5 portrait; margin: 20px;}"
                      />
                    )
                  }
                </React.Fragment>
              )
            })
          }
     </div>
       </div>
    </div>
    {
      busType === 'general' && (
        <>
        <div ref={printableComponent}>
          <Invprint
             toggleAddr={toggleAddr}
             toggleEmail={toggleEmail}
             togglePo={togglePo}
           busType={busType}
           items={calculations}
           abaName={abaName}
           abaNumber={abaNumber}
           invNo={invNo}
           cusName={cusName}
           cusComp={cusComp}
           cusPhone={cusPhone}
           cusEmail={cusEmail}
           cusAddr={cusAddr}
           invPo={invPo}
           invDate={invDate}
           invStatus={invStatus}
           partial={partial}
           discount={discount}
           grandTotal={calculateGrandTotal()}
           balance={calculateBalance()}
          />
        </div>
        <InvoiceForm
        toggleAddr={toggleAddr}
        toggleEmail={toggleEmail}
        togglePo={togglePo}
        busType={busType}
        items={calculations}
        abaName={abaName}
        abaNumber={abaNumber}
        invNo={invNo}
        cusName={cusName}
        cusComp={cusComp}
        cusPhone={cusPhone}
        cusEmail={cusEmail}
        cusAddr={cusAddr}
        invPo={invPo}
        invDate={invDate}
        invStatus={invStatus}
        partial={partial}
        discount={discount}
        grandTotal={calculateGrandTotal()}
        balance={calculateBalance()}
        />
        </>
      )
    }
    </>
  );
};

export default General;


