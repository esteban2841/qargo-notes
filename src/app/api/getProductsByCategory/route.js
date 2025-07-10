import Product from '@/models/Product'
import {dbConnect} from '@/utils/mongodb'
import {  NextResponse } from 'next/server'

export async function GET(request){
    try{
        const mongoConnection = await dbConnect()
        const url = new URL(request.url);
        const category = url.searchParams.get('category') || '';
        const productsList = await Product.find({
          categoria: { 
            $regex: `^${category}`,
            $options: 'i' 
          }
        });
        return NextResponse.json({data: productsList}, {status: 200})

    }catch (error) {
        console.error(error)
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}