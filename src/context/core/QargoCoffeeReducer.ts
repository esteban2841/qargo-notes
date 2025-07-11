import { QargoCoffeeContext } from './QargoCoffeeContext';

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
                    password: '',
                    email: '',
                    name: '',
                }
            }
            
            
        default:
            return state
    } 
}