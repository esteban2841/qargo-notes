import { Talla } from "@/components/atoms/ProductSizeSelectorButtons";
import { User } from "@/context/core/QargoCoffeeContext";
import { ReactNode } from "react";

export interface Product {
    codigo: string;
    codcolor: string;
    imagenes: string[];
    _id: string;
    referencia: string
    color: string
    categoria: string
    costo: string
    precio: string
    stock: string
    material?: string
    marca: string
    importado: string
    __v: number
    createdAt: string
    updatedAt: string
    qrcode?: string
    url?: string[]
    tallas: Talla[]
    colorPickerCode?: any[]

    // variables de seleccion para envio al carrito
    tallaSeleccionada?: Talla[]
    cantidadSeleccionada?: number
    unit_price?: string
    quantity?: string
    title?: string
    description?: string
}

export interface ColorDirObj {
    [key: string]: ColorDir;
}

export interface ColorDir {
    icon: ReactNode
    nombre: string
    material: string
    color: string
    colorCode: string
}

export interface ProductCartRef {
    products: Array<Product>,
    totalPrice: Number,
    totalQuantity?: Number,
    user?: User,

}

export interface SwiperHomeProps {
    sectionName?: string;
    sectionData?: Product[]
}

export interface SectionReference{
    name: string,
    sectionSlider: RefReact,
}
export interface RefReact {
    current: HTMLElement
}

export interface ProductsHomeCardProps {
    _id: string; // to query again when details view selected
    referencia: string
    color: string
    categoria: string
    costo: string
    precio: string
    stock: string
    marca: string
    importado: string
    imagenes: string[]
    cantidadSeleccionada?: string | number
    description?: string
}
