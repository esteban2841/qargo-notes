'use server'

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import User from '@/models/User'


const secretKey = process.env.SECRET
const encodedKey = new TextEncoder().encode(secretKey)


export async function getCurrentUser(tokenQuery) {
    // 1. Obtener la cookie
    const cookieStore = cookies()
    const token = tokenQuery || cookieStore.get('authToken')?.value
    
    // 2. Si no hay token, retornar null
    if (!token) return null
    
    try {
      // 3. Verificar el token JWT
      const { payload } = await jwtVerify(token, encodedKey)
      
      // 4. Retornar los datos del usuario del payload
      return payload
    } catch (error) {
      // 5. Manejar errores de verificación
      console.error('Error verifying token:', error)
      return null
    }
  }
export async function getUserById(user) {
    try {
      const userExtended = await User.findById(user).lean() 
      delete userExtended.password
      
      return userExtended
    } catch (error) {
      // 5. Manejar errores de verificación
      console.error('Error retrieving user:', error)
      return null
    }
  }