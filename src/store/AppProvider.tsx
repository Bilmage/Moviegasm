'use client'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import React from 'react'

import store from './index'

persistStore(store)

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Provider store={store}> {children}</Provider>
}
