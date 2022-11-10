import counterReducer from './Actions'
import AuthReducer from './AuthReducer'
// import { configureStore } from '@reduxjs/toolkit'

import loaders from './Reducers'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// export default configureStore({
//     reducer: {
//       counter: counterReducer,
//       storeToken:AuthReducer
//     },
//   })

const store = createStore(loaders,applyMiddleware(thunk))

export default store