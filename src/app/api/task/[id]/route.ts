// pages/api/task/[id].ts
import {dbConnect} from '@/utils/mongodb';
import Task from '@/models/Task';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserAction } from '@/app/actions/user';

export async function DELETE(request: NextRequest){
  try{
    await dbConnect()
        const _id = request.url.split("/").pop();
        const token = await getCurrentUserAction()
        const task = await Task.findOneAndDelete({ userId: token?.user_id, _id }); // Ensure the task belongs to the user
        const response = NextResponse.json({data: task, message: 'Inicio de sesion exitoso', ok: true})
        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}
export async function PUT(request: NextRequest){
    try{
        await dbConnect()
        const _id = request.url.split("/").pop();
        const token = await getCurrentUserAction()
        const { title, description, completed, priority } = await request.json();

        // Find the task by ID and userId to ensure the user owns the task
        const task = await Task.findOneAndUpdate(
          { _id, userId: token?.user_id }, // Query by both _id and userId
          { title, description, completed, priority, updatedAt: new Date() }, // Update fields
          { new: true, runValidators: true } // Return the updated document and run schema validators
        );

        if (!task) {
          const response = NextResponse.json({ success: false, message: 'Task not found or you do not have permission to update it.' })
          return response;
        }
        const response = NextResponse.json({data: task, message: 'Inicio de sesion exitoso', ok: true})
        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}

