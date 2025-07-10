import { google } from 'googleapis';

export const convertProductExcelFileToArray = async (productQuantityInjection?: string)=>{
    const auth = await new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET_KEY,
        process.env.REDIRECT_URI,

    )
    
    auth.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
    
    try {
        const range = `product!A1:N${productQuantityInjection || '60'}`
        const spreadsheetId = '11_qhp_CbensoFSfoeG6K_kr1yVyGUljaUlLz4yWhLP8'

        const sheets = google.sheets({ version: "v4", auth });

        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range, // e.g., "Sheet1!A1:D10"
        });
        
        const data = response.data.values

        return data
    } catch (error) {
        console.error(error)
    }
}