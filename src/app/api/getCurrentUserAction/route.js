import {dbConnect} from '@/utils/mongodb'
import { NextResponse } from 'next/server'
import { getCurrentUserAction } from "@/app/actions/user";


export async function GET(request, response){
    try{
        
        await dbConnect()
        const tokenFromCookie = request.cookies.get('authToken')?.value;
        const authHeader = request.headers.get('Authorization');
        
        let token = ''
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Get the token part after "Bearer "
        } else if (tokenFromCookie) {
            token = tokenFromCookie;
        }
        const user = await getCurrentUserAction(token)
        const origin = request.headers.get('origin');
        const allowedOrigins = [
            'http://localhost:8081',
            'exp://192.168.1.125:8081',
            'http://localhost:3000',
        ];
        const isAllowedOrigin = allowedOrigins.includes(origin);

        const corsHeaders = {
            'Access-Control-Allow-Origin': origin && isAllowedOrigin ? origin : (process.env.NODE_ENV === 'development' ? '*' : 'https://prod.com'),
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '86400',
        };

        return new NextResponse(JSON.stringify(user),{
            status: 200,
            headers: corsHeaders,
            message: 'inicio de sesion exitoso',
             // <--- Apply headers here
        });
    } catch (error) {
        console.error(error)
        return response.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}