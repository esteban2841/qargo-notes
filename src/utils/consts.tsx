import { CodeColorObj } from "@/components/atoms/IconRenderer";
import { ColorDirObj } from "@/types/product";
import { ColorCromadoDorado, ColorMaskFotoCromaticoAzul, ColorFotocromaticoRojo, ColorMaskFotocromaticoTransparente, ColorMaskCromadoEspejo, ColorMaskCromadoTornasol, ColorMaskHumo, ColorMaskRevoAzul, ColorMaskRevoDorado, ColorMaskRevoMorado, ColorMaskRevoRojo, ColorMaskRevoRojoHumo, ColorRevoVerde, ColorMaskTransparente, ColorMaskGradiente, ProfileUserIcon, Searchcircle, Staroutline, CardProfileIcon, LogInProfileIcon, LocationProfileIcon } from '@/components/atoms'

interface Dictionary {
    [key: string] : CodeColorObj
}

export const USER_PROFILE_SECTION = [

     {
        icon: <ProfileUserIcon/>,
        title: "Datos Personales",
        description: "Completa tus datos personales y de contacto, dirección y telefono",
    },


     {
        icon: <Searchcircle/>,
        title: "Tus Pedidos",
        description: "Rastrear, descargar factura",
    },

     {
        icon:<Staroutline/>,
        title:"Tus Favoritos",
        description:"Rastrear, descargar factura",
    }

]

export const colorDir : ColorDirObj = {
    FTTR: {
        icon: <ColorMaskFotocromaticoTransparente/>,
        nombre: 'fotocromatico transparente',
        material: 'fotocromatico',
        color: 'transparente',
        colorCode: 'FTTR',
        
    },
    FTAZ: {
        icon: <ColorMaskFotoCromaticoAzul/>,
        nombre: 'fotocromatico azul',
        material: 'fotocromatico',
        color: 'azul',
        colorCode: 'FTAZ',
        
    },
    FTRJ: {
        icon: <ColorFotocromaticoRojo/>,
        nombre: 'fotocromatico rojo',
        material: 'fotocromatico',
        color: 'rojo',
        colorCode: 'FTRJ',
        
    },
    CRTS: {
        icon: <ColorMaskCromadoTornasol/>,
        nombre: 'cromado tornasol',
        material: 'cromado',
        color: 'tornasol',
        colorCode: 'CRTS',

    },
    CRES: {
        icon: <ColorMaskCromadoEspejo/>,
        nombre: 'cromado espejo',
        material: 'cromado',
        color: 'espejo',
        colorCode: 'CRES',
    },
    CRDR: {
        icon: <ColorCromadoDorado/>,
        nombre: 'cromado dorado',
        material: 'cromado',
        color: 'dorado',
        colorCode: 'CRDR',
    },
    RVAZ: {
        icon: <ColorMaskRevoAzul/>,
        nombre: 'revo azul',
        material: 'revo',
        color: 'azul',
        colorCode: 'RVAZ',
    },
    RVMD: {
        icon: <ColorMaskRevoMorado/>,
        nombre: 'revo morado',
        material: 'revo',
        color: 'morado',
        colorCode: 'RVMD',
    },
    RVRJ: {
        icon: <ColorMaskRevoRojo/>,
        nombre: 'revo rojo',
        material: 'revo',
        color: 'rojo',
        colorCode: 'RVRJ',
    },
    RVVD: {
        icon: <ColorRevoVerde/>,
        nombre: 'revo verde',
        material: 'revo',
        color: 'verde',
        colorCode: 'RVVD',
    },
    RVDR: {
        icon: <ColorMaskRevoDorado/>,
        nombre: 'revo dorado',
        material: 'revo',
        color: 'dorado',
        colorCode: 'RVDR',
    },
    RVRH: {
        icon: <ColorMaskRevoRojoHumo/>,
        nombre: 'revo rojo humo',
        material: 'revo',
        color: 'rojo humo',
        colorCode: 'RVRH',
    },
    COTR: {
        icon: <ColorMaskTransparente/>,
        nombre: 'color transparente',
        material: 'color',
        color: 'transparente',
        colorCode: 'RVRH',
    },
    COHU: {
        icon: <ColorMaskHumo/>,
        nombre: 'color humo',
        material: 'color',
        color: 'humo',
        colorCode: 'COHU',
    },
    COGR: {
        icon: <ColorMaskGradiente/>,
        nombre: 'color gradiente',
        material: 'color',
        color: 'gradiente',
        colorCode: 'COGR',
    },
    
}

export const DICCIONARIO_COLORES: any = {
    humo: "#B6B6B680",
    tornasol: "#88CCEE80",
    dorado: "#FFD70080",
    espejo: "#C0C0C080",
    transparente: "#FFFFFF00",
    dorado_revo: "#FFC12580",       // Antes: "dorado revo"
    gradiente: "#FF00FF80",
    gradiente_verde: "#00FF0080",   // Antes: "gradiente verde"
    verde: "#00FF0080",
    rojo_humo: "#FF634780",         // Antes: "rojo humo"
    azul_revo: "#1E90FF80",
    azul_revo_oscuro: "#00008B80",
    azul_revo_claro: "#87CEFA80",
    rojo_revo: "#FF000080",
    rojo_revo_oscuro: "#8B000080",
    rojo_revo_claro: "#FF6B6B80",
    morado_revo: "#9370DB80",
    fotocromatico_azul_revo: "#4682B480",  // Antes: "fotocromatico azul revo"
    fotocromatico: "#70809080",
    verde_revo: "#32CD3280",
    negro_humo: "#1A1A1A80",
    mate: "#5D5D5D80",
    carbon: "#33333380",
    carbon_rojo: "#4C000080",
    carbon_negro: "#0A0A0A80",
    azul_gr: "#0047AB80",
    blanco_gr: "#F5F5F580",
    negro_rojo: "#33000080",
    negro_verde: "#00330080",
    negro_gris: "#22222280",
    azul_claro: "#ADD8E680",
    azul: "#0000FF80",
    rojo: "#FF000080",
    negro: "#00000080",
    camuflado: "#556B2F80",
    rojo_blanco: "#FFCCCB80",
    negro_rosado: "#33001180",
    cafe: "#6F4E3780",
    blanco_rojo: "#FFDDDD80",
    blanco_azul: "#DDDDFF80",
    gamusa_cafe: "#A0522D80",
    gamusa_gris: "#88888880",
    naranja: "#FFA50080",
    verde_neon: "#39FF1480",
    gris: "#80808080",
    blanco: "#FFFFFF",
    amarillo: "#FFFF00",
    morado: "#800080",
    rosa: "#FF69B4",
    rosado: "#FF69B4",
    celeste: "#87CEEB",
    marron: "#964B00",
    
    // Tonos de rojo
    rojo_oscuro: "#8B0000",
    rojo_claro: "#FF4444",
    carmesí: "#DC143C",
    borgoña: "#8B0000",
    coral: "#FF7F50",
    salmón: "#FA8072",
    
    // Tonos de azul
    azul_oscuro: "#00008B",
    azul_marino: "#000080",
    turquesa: "#40E0D0",
    cielo: "#87CEEB",
    índigo: "#4B0082",
    
    // Tonos de verde
    verde_oscuro: "#006400",
    verde_claro: "#90EE90",
    lima: "#32CD32",
    esmeralda: "#008000",
    jade: "#00A86B",
    menta: "#F5FFFA",
    
    // Tonos de amarillo
    amarillo_oscuro: "#808000",
    amarillo_claro: "#FFFFE0",
    oro: "#FFD700",
    mostaza: "#FFDB58",
    chartreuse: "#7FFD00",
    
    // Tonos de morado
    morado_oscuro: "#4B0082",
    morado_claro: "#E6E6FA",
    lila: "#C7B8EA",
    violeta: "#800080",
    magenta: "#FF00FF",
    lavanda: "#E6E6FA",
    
    // Tonos de naranja
    naranja_oscuro: "#FF8C00",
    naranja_claro: "#FFA07A",
    melocotón: "#FFDAB9",
    // Tonos de gris
    gris_oscuro: "#333333",
    gris_claro: "#F5F5F5",
    plateado: "#C0C0C0",
    carbón: "#333333",
    acero: "#708090",
    
    // Tonos de marrón
    marrón_oscuro: "#654321",
    marrón_claro: "#D2691E",
    beis: "#F5F5DC",
    canela: "#D2691E",
    chocolate: "#964B00",
    arena: "#F4A460",
    
    // Tonos de rosa
    rosa_oscuro: "#C154C1",
    rosa_claro: "#FFB6C1",
    fucsia: "#FF00FF",
     // Tonos de verde
};