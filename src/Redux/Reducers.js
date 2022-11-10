import axios from "axios"
import { success_notify , fail_notify } from "../utils/Utilfunctions"

// ACTIONS
const START_LOADER = "START_LOADER"
const STOP_LOADER = "STOP_LOADER"
const STORE_TOKEN = 'STORE_TOKEN'
const GET_USER = "GET_USER"
const LOG_OUT = "LOG_OUT"


// ACTION CREATORS

export const start_loading = () =>{
    return {type: START_LOADER}
} 

export const stop_loading = () =>{
    return {type: STOP_LOADER}
} 

export const store_token = (token) =>{
    return {type: STORE_TOKEN,payload:token}
} 

export const get_users = (user) =>{
    return {type: GET_USER, payload:user}
} 

export const logout = () =>{
    return {type: LOG_OUT}
} 



// STORE VALUES
const initialState = {
    load:false,
    token:null,
    user:null
}

// REDUCER
const loaders = (state = initialState,action )=>{
    switch(action.type){
       case START_LOADER: return {
        ...state,
        load:true
       }
       
       case STOP_LOADER: return {
        ...state,

        load:false
       } 

       case STORE_TOKEN:return {
        ...state,
        token:action.payload
       }
       case GET_USER:return {
        ...state,
        user:action.payload
       }
       case LOG_OUT:return {
        ...state,
        token:null,
        user:null
       }
      
       

    default: return state
    }
    
}


// THUNK REDUX ACTIONS HERE

// FETCH USER DATA FROM HERE
export const get_data = ()=>{
    const get_token = window.localStorage.getItem('token')
    
    return async(dispatch)=>{
        if(get_token){
            const config = {
                headers: { authorization: `Bearer ${get_token}` }
            };

            dispatch(start_loading())
            await axios.post( 
                'https://payinsta-api.herokuapp.com/userdetails',{},
                config
              ).then((data)=>{
                 
                 //console.log(data.data.response.user)
                 console.log("user fetched")
                 dispatch(get_users(data.data.response.user))
                   
                 
                 dispatch(stop_loading())
                 if(data.data.response.code == 400){
                    dispatch(store_token(null))
                 }
    
              }).catch((err)=> {
                 console.log(err.response)
                
                 window.localStorage.clear('token')
                 window.location.reload()
                 fail_notify('Something went Wrong !',4000)
              });
            
        }
    }
  
}

// FETCH USER DATA FROM HERE
export const log_out = ()=>{
   
  return async(dispatch)=>{
    dispatch(start_loading())
      window.localStorage.clear()
      dispatch(logout())
      window.location.reload()
      success_notify('Logged out successfully !',4000)
      
  }
}

export default loaders