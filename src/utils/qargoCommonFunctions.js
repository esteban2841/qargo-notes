import axios from 'axios'

const url = `${process.env.BACKEND_URI || 'http://localhost:3000/api'}`





export const fetchDataSections =  async (url, endpoint, category, authToken, method, rol) => {
    
    if(endpoint == 'logout'){

        const res = await axios(`${url}/logout`, {
            
            method: method || 'POST',
            credentials: 'include',
            data: {
                user: authToken,
            }
        },
        
    )
    if (res.status !== 200 ) {
        throw new Error('Failed to fetch data')
    }
    
        
        return res
    }
    if(endpoint == 'clientes'|| endpoint == 'empleados' ){

        const res = await axios(`${url}/register`, {
            
            method: method || 'POST',
            credentials: 'include',
            data: {
                user: authToken,
            }
        },
        
    )
        if (res.status !== 200 ) {
            throw new Error('Failed to fetch data')
        }
        
        const {data} = await res
        
        return data
    }
    if(endpoint == 'user'){
        
        const res = await axios(`${url}/${endpoint}`, {
            params: {

                rol
            },
            method: method || 'POST',
        },{
            withCredentials: true, // Esto es equivalente a credentials: 'include'
        }
    )
        if (res.status !== 200 ) {
            throw new Error('Failed to fetch data')
        }
        
        const {data} = await res
        
        return data.user
    }

    


   
}




