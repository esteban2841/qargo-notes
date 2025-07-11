'use client'
import React, { useReducer } from 'react'
import { QargoCoffeeContext } from './QargoCoffeeContext';
import { qargoCoffeeReducer } from './QargoCoffeeReducer';
import axios from 'axios';
import { fetchDataSections } from '@/utils/qargoCommonFunctions';
import { useRouter } from 'next/navigation';

export interface SectionRef {
    current: HTMLElement,
    name: string
}

const INITIAL_STATE: QargoCoffeeContext = {
    helmet: {autoRotate: false},
    isLoginMode: true,
    usuario: {
        _id: "",
        name: '',
        password: '',
        email: '',
    },
}

interface Props {
    children: React.ReactElement | React.ReactElement[] | React.ReactNode
}
const NEXT_PUBLIC_BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;


export const QargoCoffeeProvider = ({children}: Props) => {
    const router = useRouter()
    
    const [state, dispatch] = useReducer(qargoCoffeeReducer, INITIAL_STATE)
    
    
    const fetchUsuario = async (payload: QargoCoffeeContext) =>{
        try {
            const response = await axios.get('api/user')
            if(response.data){
                dispatch({type:'fetchUsuario', payload: response.data})
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    const setUserLogged = async (payload: QargoCoffeeContext) =>{
        
        dispatch({type:'setUserLogged', payload: payload})
        
        
    }
    const logout = async (payload: QargoCoffeeContext) =>{
        const res = await fetchDataSections(NEXT_PUBLIC_BACKEND_URI, 'logout', undefined, undefined, 'GET', undefined)
        dispatch({type:'logout', payload: payload})
        
        router.push('/')
        
        
    }
    const toggleMode = async (payload: QargoCoffeeContext) =>{
        dispatch({type:'toggleMode', payload: payload})
        
        router.push('/')
        
        
    }


    return (
        <QargoCoffeeContext.Provider value={{
            ...state,
            fetchUsuario,
            setUserLogged,
            logout,
            toggleMode
        }}>
            {children}
        </QargoCoffeeContext.Provider>
    )
}
