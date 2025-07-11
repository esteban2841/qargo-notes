import axios from 'axios'


export const fetchDataSections =  async (url, endpoint, category, authToken, method, rol) => {
    console.log("🚀 ~ fetchDataSections ~ authToken:", authToken)
    
    if(endpoint == 'register'){

        const res = await axios(`${url}/register`, {
            
            method: method || 'POST',
            credentials: 'include',
            data: {
                ...authToken
            }
        },
        
    )
    console.log("🚀 ~ fetchDataSections ~ res:", res)
    if (res.status !== 200 ) {
        throw new Error('Failed to fetch data')
    }
    
        
        return res.data
    }
    if(endpoint == 'login'){

        const res = await axios(`${url}/login`, {
            
            method: method || 'POST',
            credentials: 'include',
            data: {
                ...authToken
            }
        },
        
    )
    if (res.status !== 200 ) {
        throw new Error('Failed to fetch data')
    }
    
        
        return res.data
    }
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
    
        
        return res.data
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




