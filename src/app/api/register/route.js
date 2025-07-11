import bcrypt from 'bcrypt'
import User from '../../../models/User'
import {dbConnect} from '../../../utils/mongodb'
import { NextResponse } from 'next/server';


export async function POST(request){
    await dbConnect()
    const {email, password, name  } = await request.json();

    console.log("🚀 ~ POST ~ email, password, name:", email, password, name)

    try{
        if(!email || !password ) return NextResponse.json({message: 'Por favor provea sus credenciales'})
        
        if(!/^\S+@\S+\.\S+$/.test(email)){
            return NextResponse.json({
                message: 'Formato de email electronico invalido'
            }, {status: 400})
        }

        const user = await User.findOne({email})

        if(user) return NextResponse.json({message: 'Ya existe una cuenta con tu email electronico'}, {status: 500})

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({email, password: hashPassword, name  })
        await newUser.save();
        return NextResponse.json({message: 'Perfil Creado', data: newUser, status: 200}, {status: 200})


    }catch (error) {
        console.error(error)
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}