'use server'

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import Product from "@/models/Product"
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
			console.log("TCL: getCurrentUser -> payload", payload)
      
      // 4. Retornar los datos del usuario del payload
      return payload
    } catch (error) {
      // 5. Manejar errores de verificación
      console.error('Error verifying token:', error)
      return null
    }
  }
export async function getProductsById(products) {
    try {
      const productsExtended = await Promise.all(products.map(async (prod, index)=>{
        const product = await Product.findById(prod).lean() 
        return product
      }))
      
      // 4. Retornar los datos del usuario del payload
      return productsExtended
    } catch (error) {
      // 5. Manejar errores de verificación
      console.error('Error retrieving products:', error)
      return null
    }
  }
export async function getUserById(user) {
    try {
      const userExtended = await User.findById(user).lean() 
      delete userExtended.password
			console.log("TCL: getUserById -> userExtended", userExtended)
      
      return userExtended
    } catch (error) {
      // 5. Manejar errores de verificación
      console.error('Error retrieving user:', error)
      return null
    }
  }