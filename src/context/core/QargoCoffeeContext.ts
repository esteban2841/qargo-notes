'use client'
import { createContext } from 'react'
import { Helmet } from '../../types/helmet'

export interface User {
    _id?: string
    name: string
    password: string
    email: string,
}



export interface QargoCoffeeContext {
    
    [key: string]: any;
    //helmet animation handlers
    isLoginMode: boolean,
    helmet: Helmet
    toggleRotation?: (payload: any) => void


    //user actions login and register
    usuario?: User
    fetchUsuario?: (payload: any) => void


    setUserLogged?: (payload: any) => void
    logout?: (payload: any) => void
    
    toggleMode?: (payload: any) => void
    
}

export const QargoCoffeeContext = createContext({} as QargoCoffeeContext)