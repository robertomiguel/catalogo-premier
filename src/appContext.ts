import React from 'react'
import { IAppContext } from './App.types'

const AppContext = React.createContext<IAppContext>({
    db: undefined
})

export default AppContext