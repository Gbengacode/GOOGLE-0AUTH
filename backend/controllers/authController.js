import { oAuth2Client } from "../config/auth.js"
import {jwtDecode} from "jwt-decode";


export const authController = async (req, res) => {
  try {
     const { code } = req.body
     const { tokens } = await oAuth2Client.getToken(code)
     const tokenInfo  = jwtDecode(tokens.id_token)
     // can process the info 
     return res.status(200).json(tokenInfo)
    
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error: 'internal server error', message: error.message })
  }
}
