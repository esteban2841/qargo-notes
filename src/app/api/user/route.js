import User from '@/models/User'
import {dbConnect} from '@/utils/mongodb'
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    // Parse the request body as JSON
    const body = await req.json();
    const { userId } = body; // Example: assuming email and password are sent

    // --- Your business logic goes here ---
    // For example, validate input, interact with a database, etc.

        if (!userId) {
            return { error: 'No token provided', status: 401 };
        }
        
        const user = await User.findById(userId);
        // const userId = await getUserData(request);
        // const user = await User.findById(userId).select('username')
        const response = NextResponse.json({user, message: 'Inicio de sesion exitoso'})
        return response // Replace with actual user data
  } catch (error) {
    // Log the error for debugging purposes
    return NextResponse.json({ error: 'Failed to create user.' }, { status: 500 });
  }
}
export async function DELETE(request){
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
        return NextResponse.json({ error: 'Failed to delete user.' }, { status: 500 });
    }
}
export async function GET(request){
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
        return NextResponse.json({ error: 'Failed to get user.' }, { status: 500 });
    }
}

