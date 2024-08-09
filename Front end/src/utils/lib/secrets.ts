import dotenv from "dotenv"

dotenv.config({path: '.env'})

export const VITE_BACKEND_PORT = process.env.BACKEND_PORT
export const VITE_BACKEND_URL = process.env.BACKEND_URL