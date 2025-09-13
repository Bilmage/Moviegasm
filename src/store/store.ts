import { combineReducers } from 'redux'
import { apiSlice } from './api/apiSlice'


const rootReducer = combineReducers({
  api: apiSlice.reducer,
})

export type RootReducer = ReturnType<typeof rootReducer>
export default rootReducer
