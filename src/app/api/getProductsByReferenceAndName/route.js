import Product from '@/models/Product'
import {dbConnect} from '@/utils/mongodb'
import {  NextResponse } from 'next/server'

export async function GET(request){
    try{
        const mongoConnection = await dbConnect()
        const url = new URL(request.url);
        const marca = url.searchParams.get('marca')
        console.log("🚀 ~ GET ~ marca:", marca)
        const referencia = url.searchParams.get('referencia')
        console.log("🚀 ~ GET ~ referencia:", referencia)
        
        const productsList = await Product.aggregate([
            {
                $match: { marca: marca, referencia: referencia }
            },
            {
              $group: {
                _id: "$referencia",
                product: { $push: "$$ROOT" }
              }
            },
            { $unwind: "$product" },
            {
              $replaceRoot: { newRoot: "$product" }
            }
          ]);
        return NextResponse.json({data: productsList}, {status: 200})

    }catch (error) {
        console.error(error)
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}