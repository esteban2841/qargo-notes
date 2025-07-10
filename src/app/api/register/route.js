import bcrypt from 'bcrypt'
import User from '@/models/User'
import {dbConnect} from '@/utils/mongodb'
import { NextResponse } from 'next/server';


export async function POST(request){
    await dbConnect()
    const { user } = await request.json();
    const {correo, contraseña, usuario, nombre, apellido, celular, direccion, ciudad, departamento, cedula, rol } = user || await request.json();

    const role = rol || user.rol || 'usuario'

    try{
        if(!correo || !contraseña || !usuario) return NextResponse.json({message: 'Por favor provea sus credenciales'})
        
        if(!/^\S+@\S+\.\S+$/.test(correo)){
            return NextResponse.json({
                message: 'Formato de correo electronico invalido'
            }, {status: 400})
        }

        const user = await User.findOne({correo})

        if(user) return NextResponse.json({message: 'Ya existe una cuenta con tu correo electronico'}, {status: 500})

        const hashPassword = await bcrypt.hash(contraseña, 10)
        const newUser = new User({correo, contraseña: hashPassword, usuario, nombre, apellido, celular, direccion, ciudad, departamento, cedula, rol: role})
        await newUser.save();
        return NextResponse.json({message: 'Perfil Creado'}, {status: 200})


    }catch (error) {
        console.error(error)
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}