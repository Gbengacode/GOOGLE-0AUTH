import express from "express"
import { authController } from "../controllers/authController.js"


const authRouter = express.Router()

authRouter.post("/signin", authController)
export default authRouter