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
    console.error('Error in POST /api/user:', error);

    // Handle different types of errors if necessary
    if (error instanceof SyntaxError) {
      // If the request body is not valid JSON
      return NextResponse.json(
        { message: 'Invalid JSON in request body.' },
        { status: 400 }
      );
    }

    // For any other unexpected errors, return a 500 Internal Server Error
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
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
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
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
        return NextResponse.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}

