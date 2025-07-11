import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const allowedOrigins = [
    '*',
    process.env.NEXT_PUBLIC_BASE_URL,
    'https://qargo-coffee.vercel.app',
    'https://qargo-coffee-virid.vercel.app',
    'qargo-coffee.vercel.app'
    // Puerto común para desarrollo de React Native
];
const secret = new TextEncoder().encode(process.env.SECRET)

export async function middleware (request){
    const origin = request.headers.get('origin');
    let response = NextResponse.next();

    if (origin && !allowedOrigins) {
        // If an origin is present and it's NOT in our allowed list, block immediately
        return new NextResponse('Not allowed by CORS', { status: 403 });
    }

    // Set CORS headers for all valid requests (including preflight and actual requests)
    const corsHeaders = {
        'Access-Control-Allow-Origin': origin && allowedOrigins ? origin : (process.env.NODE_ENV === 'development' ? '*' : process.env.NEXT_PUBLIC_BASE_URL ),
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
    };

    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });
    // If it's an OPTIONS (preflight) request, respond immediately with 204
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 204, headers: response.headers });
    }
    
    const path = request.nextUrl.pathname;
    const isPublicPath = 
    path === '/' 
    || path === '/api/register' 
    || path == '/api/login'
    || path == '/api/logout'
    || path == '/api/task'
    
    const tokenFromCookie = request.cookies.get('authToken')?.value;
    const authHeader = request.headers.get('Authorization');
    
    let token = ''
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Get the token part after "Bearer "
    } else if (tokenFromCookie) {
        token = tokenFromCookie;
    }
    
    if(!token && !isPublicPath){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (token){
        try {
            const {payload} = await jwtVerify(token, secret)
            const tokenExpiration = new Date(payload.exp * 1000)
            if(tokenExpiration <= new Date()){
                return NextResponse.redirect(new URL('/', request.url))
            }
            if(isPublicPath){
                return NextResponse.next();
            }

        } catch (error) {
            console.error("🚀 ~ middleware ~ error:", error)
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/api/:path*',
        '/main',
    ]
}