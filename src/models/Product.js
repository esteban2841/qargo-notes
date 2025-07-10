import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    referencia: {
        type: String,
        required: true
    },
    codcolor: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: true,
    },
    costo: {
        type: String,
        required: false
    },
    precio: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: false
    },
    marca: {
        type: String,
        required: true
    },
    imagenes: {
        type: Array,
        required: true
    },
    importado: {
        type: String,
        required: false
    },
    tallas: {
        type: Array,
        required: true
    },
    genero: {
        type: String,
        required: false
    },
    qrcode: {
        type: String,
        required: false
    }
    
}, {timestamps: true})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product;