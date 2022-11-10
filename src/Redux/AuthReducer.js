import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const authReducer = createSlice({
  name: 'token',
  initialState: {
    value: null,
  },
  reducers: {
     store_token:(state,actions)=>{
          state.value = actions.payload
     },
     get_user:async (state,actions)=>{
        if(state.value !==null){
            const config = {
                headers: { authorization: `Bearer ${state.value}` }
            };
          
             console.log(config)
            
            await axios.post( 
              'http://localhost:4000/userdetails',{},
              config
            ).then((data)=>{
               
               return data.data.response.user
            }).catch((err)=> console.log(err.response.data));
        }
   }
  },
})

// Action creators are generated for each case reducer function
export const { store_token, get_user} = authReducer.actions

export default authReducer.reducer