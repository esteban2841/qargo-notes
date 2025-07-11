import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(){
    const response = new NextResponse(JSON.stringify({ status:200, message: 'Cerraste sesion exitosamente' }), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    })


    cookies().set('authToken', '', {
        domain: process.env.NODE_ENV === 'production' ? 'https://qargo-coffee.vercel.app' : undefined ,
        expires: new Date(0), // Expire immediately
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
        // No especificar domain para localhost
        // En producción:
        // domain: '.midominio.com'
        })

    return response
}