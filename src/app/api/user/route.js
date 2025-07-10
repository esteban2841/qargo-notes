import User from '@/models/User'
import {dbConnect} from '@/utils/mongodb'
import bcrypt from 'bcrypt'
import { NextResponse, NextRequest } from 'next/server'


const secret = process.env.SECRET;

export async function POST(request, response){
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
        return response.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}
export async function DELETE(request){
    try{
        const mongoConnection = await dbConnect()
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
export async function GET(request, response){
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
        return response.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}

export async function PUT(request, response){
    try{
        
        await dbConnect()
        const {userInfo, pedido, payment, key} = await request.json();


        if(key == "editForm"){

            const userBeforeModified = await User.findOne({email: userInfo.email}).lean()
            console.log("TCL: PUT -> userBeforeModified", userBeforeModified)
            const contraseñaDb = userBeforeModified.contraseña
            
            if(!userBeforeModified) NextResponse.json({message: 'Credenciales invalidas'})
                
            console.log("TCL: PUT -> contraseñaDb", contraseñaDb, userInfo.contraseña)
            const isPasswordValid = await bcrypt.compare(userInfo.contraseña, contraseñaDb)
			console.log("TCL: PUT -> isPasswordValid", isPasswordValid)
    
            if(!isPasswordValid) return NextResponse.json({message: 'Credenciales invalidas'}, {status: 400})
            
            const hashPassword = await bcrypt.hash(userInfo.nuevaContraseña || userInfo.contraseña, 10)
            const userModified = await User.findOneAndUpdate({_id: userInfo._id}, {
                ...userInfo,
                contraseña: hashPassword 
            }, {
                new: true
            })
            console.log("TCL: PUT -> userModified", userModified)
            const response = NextResponse.json({userModified, message: 'Usuario modificado con exito'})
            return response
        }

        const nuevoPedido = {
            paymentId: payment.paymentId,
            date_approved: payment.date_approved,
            totalAmount: payment.transaction_details.total_paid_amount,
            taxes: payment.taxes,
            payment_method: payment.payment_method,
            productos: [
                ...pedido
            ]
        }
        
        console.log("TCL: PUT -> nuevoPedido", nuevoPedido)
    
        if (!userInfo && !pedido) {
            return { error: 'No hay informacion del pagador ni de los productos', status: 401 };
        }
      
          // Verify the token
        const userBeforeModified = await User.findOne({email: userInfo.email}).lean()
		console.log("TCL: PUT -> userBeforeModified", userBeforeModified)

        const {pedidos} = userBeforeModified

        const anterioresPedidos = pedidos && pedidos.length ? [...pedidos] : [] 
		console.log("TCL: PUT -> pedidos", anterioresPedidos)

        const userModified = await User.findOneAndUpdate({_id: userBeforeModified._id}, {
            pedidos: [
                ...anterioresPedidos,
                {...nuevoPedido}
            ]
        }, {
            new: true
        })
        console.log("TCL: PUT -> userModified", userModified)
        const response = NextResponse.json({userModified, message: 'Usuario modificado con exito'})
        return response
    } catch (error) {
        console.error(error)
        return response.json({message: 'Error recuperando la informacion del usuario', status: 500})
    }
}

