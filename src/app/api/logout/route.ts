import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(){
    try{
        // Aquí podrías realizar alguna lógica adicional si es necesario
        const response = new NextResponse(JSON.stringify({ status:200, message: 'Cerraste sesion exitosamente' }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        })
    
    
        cookies().set('authToken', '', {
            domain: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : undefined ,
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
    } catch (error) {
        console.error("🚀 ~ GET ~ error:", error)
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}