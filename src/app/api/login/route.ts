import bcrypt from 'bcryptjs'
import User from '../../../models/User'
import {dbConnect} from '../../../utils/mongodb'
import { SignJWT } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { User as UserType } from '@/context/core/QargoCoffeeContext'

const secret = process.env.SECRET

interface PayloadTokenCreation {
    userId: string;
    email: string;
    user_id: string;
}

export async function POST(request: NextRequest){
    
    try{
        await dbConnect()
        const {email, password} = await request.json();
        if(!email || !password) NextResponse.json({message: 'Por favor provea sus credenciales'})

        const user: UserType = await User.findOne({email})
        const passwordDb = user.password

        if(!user) NextResponse.json({message: 'Credenciales invalidas'})

        const isPasswordValid = await bcrypt.compare(password, passwordDb)

        if(!isPasswordValid) return NextResponse.json({message: 'Credenciales invalidas'}, {status: 400})
        
        const jwtSecret = new TextEncoder().encode(secret)
        const token = await new SignJWT(
            {
                userId: user._id,
                email: user.email,
                user_id: user?._id.toString(),
            } as PayloadTokenCreation
        ).setProtectedHeader({alg: 'HS256'}).setExpirationTime('1d').sign(jwtSecret);


        const response = new NextResponse(JSON.stringify({payload: token, userId: token.userId, message: 'Éxito', status: 200 }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        })


        cookies().set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // o 'strict'
            maxAge: 60 * 60 * 24, // 1 día
            path: '/',
            // En desarrollo:
            domain: process.env.NODE_ENV === 'production' ? process.env.PROD_DOMAIN : undefined ,
            
            
            // No especificar domain para localhost
            // En producción:
            // domain: '.midominio.com'
          })


        return response

    }catch (error) {
        console.error("🚀 ~ POST ~ error:", error)
        return NextResponse.json({message: 'Credenciales invalidas'}, {status: 500})
    }
}