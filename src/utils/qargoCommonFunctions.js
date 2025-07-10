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
        
        const {data} = await res
        
        return data
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
    if(endpoint == 'productos'){

        const res = await axios(`${url}/producto`, {
            
            method: method || 'POST',
            credentials: 'include',
            data: {
                product: authToken,
            }
        },
        
    )
        if (res.status !== 200 ) {
            throw new Error('Failed to fetch data')
        }
        
        const {data} = await res
        
        return data
    }
    if(endpoint == 'checkout'){

        const res = await axios.post(`${url}/${endpoint}`, {
            checkoutData: authToken
        },{
            method: 'POST',
            credentials: 'include',
        }
    )
        if (res.status !== 200 ) {
            throw new Error('Failed to fetch data')
        }
        
        const {data} = await res
        
        return data
    }
    if(endpoint == 'addiTransactionStart'){

        const res = await axios.post(`${url}/${endpoint}`, {
            checkoutData: authToken
        },{
            method: 'POST',
            credentials: 'include',
        }
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

    if(!category) {
        const res = await axios.get(`${url}/${endpoint}`)
        if (res.status !== 200 ) {
            throw new Error('Failed to fetch data')
        }
        
        const {data} = await res
        
        return data.data
    }
    
    if(typeof category == 'string'){
        
        if(category?.includes('&')){
            const parametros = category.split('&')
            console.log("🚀 ~ fetchDataSections ~ parametros:", parametros)
            const newParameters = parametros.map(param=>param.replaceAll('+', ' '))
            
            const params = {}
            
            const loop = newParameters.forEach(param=>{
                const key = param.split('=').shift()
                const value = param.split('=').pop()
                
                
                if(!params[key]) params[key] = value
                if(params[key]) return
                
            })
            console.log("🚀 ~ fetchDataSections ~ params:", params)
            
            const res = await axios.get(`${url}/${endpoint}`, 
                {
                    params:{
                        marca: params.marca,
                        referencia: params.referencia
                    }
                }
            )
            if (res.status !== 200 ) {
                throw new Error('Failed to fetch data')
            }
            
            const {data} = await res
            
            return data.data
        }else{
            
            const res = await axios.get(`${url}/${endpoint}`, 
                {
                    params: {
                        category: category
                    }
                }
            )
            if (res.status !== 200 ) {
                throw new Error('Failed to fetch data')
            }
            
            const {data} = await res
            
            return data.data
        }
        
    }


   
}




