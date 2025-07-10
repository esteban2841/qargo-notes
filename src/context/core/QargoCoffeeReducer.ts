import { QargoCoffeeContext } from './QargoCoffeeContext';
import { Product } from '@/types/product';

export const qargoCoffeeReducer = (state: QargoCoffeeContext, action: any) : QargoCoffeeContext => {
    switch (action.type) {
        case 'toggleMode':
            return{
                ...state,
                isLoginMode: action.payload
            }
        case 'toggleRotation':
            return{
                ...state,
                helmet: action.payload
            }
        case 'setUserLogged':
            
            return {
                ...state,
                usuario: action.payload
            }
            case 'logout':
                
            

            return {
                ...state,
                usuario: {
                    usuario: '',
                    contraseña: '',
                    correo: '',
                    celular: '',
                    direccion: '',
                    ciudad: { id: 0, name: '' },
                    departamento: { id: 0, name: '' },
                    nombre: '',
                    apellido: '',
                    cedula: ''
                }
            }
            
            
            default:
            return state
    } 
}