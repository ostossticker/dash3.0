import {create} from 'zustand'

type toggleVal = {
   
    isOpen: boolean;
    onOpen:() =>void;
    onClose:()=>void;
    toggle:()=>void; ////toggle 

    isHover:boolean;
    onCloseHover:()=>void;
    onOpenHover:()=>void; /////// hover

    links:string;
    changeLink:(newVal:string)=>void;/// changeLink in sidebar

    currentTime:Date;
    setCurrentTime:(newTime:Date)=>void;

    //toggle dark mode and light mode
    darkMode:boolean;
    toggleDarkMode:()=>void;
    initializeDarkModeFromLocalStorage:()=>void;

    pending:boolean; // for using globaly when need
    setPending:(toggle:boolean)=>void;

    passingId:string; // for edit datas with modal
    edit:boolean;
    onEdit:()=>void;
    onCancel:()=>void;
    setPassingId:(id:string)=>void;

    bgModal:string; //for big modal with split 
    setModal:(newString:string)=>void;

    ////print stuff
    print:boolean;
    setPrint:()=>void;
}

const useToggle = create<toggleVal>((set)=>({
    passingId:'',
    edit:false,
    links:"",
    pending:false,
    isOpen:false,
    isHover:false,
    darkMode:false,
    bgModal:'',
    print:false,
    onOpen:()=>{
        set({ isOpen:true})
    },
    onClose:()=>{
        set({isOpen:false})
    },
    toggle:()=>{
        set((state)=>({
            isOpen: !state.isOpen,
        }));
    },
    onCloseHover:()=>{
        set({isHover:false})
    },
    onOpenHover:()=>{
        set({isHover:true})
    },
    setPending:(toggle)=>{
      set({pending:toggle})  
    },
    changeLink:(newVal:string)=>{
        set({
            links:newVal
        })
    },
    currentTime: new Date(),
    setCurrentTime:(newTime)=> {
        set({
            currentTime: newTime
        })
    },
    toggleDarkMode:() => set((state) =>{
      const newDarkMode = !state.darkMode;
      localStorage.setItem('darkMode',newDarkMode.toString());
      return{darkMode:newDarkMode}  
    }),
    initializeDarkModeFromLocalStorage:()=>{
        const storedTheme = localStorage.getItem('darkMode');
        if(storedTheme){
            set({
                darkMode:storedTheme === 'true'
            })
        }
    },

    //////// edit datas with modals 
    onEdit:()=>{
        set({edit:true})
    },
    onCancel:()=>{
        set({edit:false})
    },
    setPassingId:(id)=>{
        set({passingId:id})
    },
    
    ///////// bigmodal for split
    setModal:(newString)=>{
        set({bgModal:newString})
    },
    ////// print 
    setPrint:()=>{
        set((state)=>({
            print: !state.print,
        }));
    }
}))

export default useToggle