import { OAuth2Client } from 'google-auth-library'
const { CLIENTID, CLIENTSECRET, REDIRECT_URL } = process.env

const oAuth2Client = new OAuth2Client(CLIENTID, CLIENTSECRET, REDIRECT_URL)

export { oAuth2Client }
