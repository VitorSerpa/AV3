import { Router } from "express"
import * as controller from "../Controllers/AuthController.js"

const router = Router()

router.post("/", controller.login)


export default router