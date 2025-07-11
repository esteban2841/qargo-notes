// pages/api/task/index.ts
import {dbConnect} from '../../../utils/mongodb';
import Task from '../../../models/Task';
import { getCurrentUserAction } from '../../actions/user';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    try{
        await dbConnect()
        const token = await getCurrentUserAction()
        const tasks = await Task.find({ userId: token?.user_id }).sort({ createdAt: -1 }); // Sort by creation date, newest first
        const response = NextResponse.json({data: tasks, message: 'Inicio de sesion exitoso', ok: true})
        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}
export async function POST(request: NextRequest){
    try{
        await dbConnect()
        const token = await getCurrentUserAction()
        const { title, description, completed, priority } = await request.json();

        // Basic validation
        if (!title) {
          return NextResponse.json({ success: false, status: 400, message: 'Title is required.' });
        }

        const task = await Task.create({
          userId: token?.user_id, // Assign the task to the current user
          title,
          description,
          priority,
          completed: completed || false, // Default to false if not provided
        });
        const response = NextResponse.json({data: task, message: 'Tarea creada exitosamente', status: 201}) // 201 Created
        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}

