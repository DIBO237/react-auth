import { ToastContainer, toast } from "react-toastify";


// SUCCESS TOAST MESSAGE
export const success_notify = (message,delay)=>{

   return toast.success(message, {
        position: "top-right",
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}

// FAILURE TOAST MESSAGE
export const fail_notify = (message,delay)=>{

    return toast.error(message, {
        position: "top-right",
        autoClose:delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
 }

// SEPERATE PRICE WITH COMMAS 49,000
 export const numberWithCommas = (x)=> {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}