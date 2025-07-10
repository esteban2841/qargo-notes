import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    usuario: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: Object,
        required: true
    },
    departamento: {
        type: Object,
        required: true
    },
    cedula: {
        type: Number,
        required: true
    },
    salario: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    
}, {timestamps: true})

const Empleado = mongoose.models.Empleado || mongoose.model("Empleado", empleadoSchema)

export default Empleado;
