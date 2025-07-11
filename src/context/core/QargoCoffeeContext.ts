'use client'
import { createContext } from 'react'
import { Helmet } from '@/types/helmet'

export interface User {
    _id?: string
    name: string
    password: string
    email: string,
}



export interface QargoCoffeeContext {
    
    [key: string]: unknown;
    //helmet animation handlers
    isLoginMode: boolean,
    helmet: Helmet
    toggleRotation?: (payload: unknown) => void


    //user actions login and register
    usuario?: User
    fetchUsuario?: (payload: unknown) => void


    setUserLogged?: (payload: unknown) => void
    logout?: (payload: unknown) => void
    
    toggleMode?: (payload: unknown) => void
    
}

export const QargoCoffeeContext = createContext({} as QargoCoffeeContext)