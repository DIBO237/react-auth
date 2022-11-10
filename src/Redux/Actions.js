import { createSlice } from '@reduxjs/toolkit'

export const loader = createSlice({
  name: 'loader',
  initialState: {
    value: false,
  },
  reducers: {
     start_loader:(state)=>{
          state.value = true
     },
     stop_loader:(state)=>{
        if(state.value === true){
            state.value = false
        }
     }
  },
})

// Action creators are generated for each case reducer function
export const { start_loader, stop_loader} = loader.actions

export default loader.reducer