import dotenv from "dotenv"

dotenv.config({path: '.env'})

export const PORT = process.env.PORT
export const WEB_DOMAIN = process.env.WEB_DOMAIN
export const JWT_SECRET = process.env.JWT_SECRET!