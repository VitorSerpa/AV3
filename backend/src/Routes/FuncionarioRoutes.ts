import { Router } from "express"
import * as controller from "../Controllers/FuncionarioController.js"

const router = Router()

router.get("/", controller.getAll)
router.post("/", controller.create)
router.get("/:id", controller.getEtapasById)

export default router