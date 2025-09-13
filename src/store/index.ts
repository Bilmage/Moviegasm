'use client'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import rootReducer, { RootReducer } from './store'  
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { apiSlice } from './api/apiSlice'
import storage from 'redux-persist/lib/storage'

export const persistedReducer = persistReducer<RootReducer>(
  {
    key: 'moviegasm',
    storage,
    blacklist: [],
  },
  rootReducer
)

export const setupStore = (preloadedState?: Partial<RootReducer>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState: preloadedState as RootReducer & PersistPartial,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV === 'development',
  })
}

const store = setupStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
