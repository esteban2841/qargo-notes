import User from '@/models/User'
import {dbConnect} from '@/utils/mongodb'
import { NextResponse, NextRequest } from 'next/server'


export async function POST(request: NextRequest){
    try{
        
        await dbConnect()
        const {userId} = await request.json();
        
        if (!userId) {
            return { error: 'No token provided', status: 401 };
        }
        
        const user = await User.findById(userId);
        // const userId = await getUserData(request);
        // const user = await User.findById(userId).select('username')
        const response = NextResponse.json({user, message: 'Inicio de sesion exitoso'})
        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}
export async function DELETE(request: NextRequest){
    try{
        await dbConnect()
        const {user} = await request.json()
        const {_id, email} = user
        let deletedUser = await User.findOneAndDelete({_id})
        if(!deletedUser){
            deletedUser = await User.findOneAndDelete({email})
        }
        return NextResponse.json({data: deletedUser}, {status: 200})


    }catch (error) {
        console.error(error)
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}
export async function GET(request: NextRequest){
    try{
        await dbConnect()
        const url = new URL(request.url);
        const rol = url.searchParams.get('rol') || '';
        
        const user = await User.find({rol});
        // const userId = await getUserData(request);
            // const user = await User.findById(userId).select('username')
        const response = NextResponse.json({user, message: 'Inicio de sesion exitoso'})
        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}

