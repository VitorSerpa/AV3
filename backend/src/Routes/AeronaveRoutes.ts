import { Router } from "express"
import * as controller from "../Controllers/AeronaveController.js"

const router = Router()

router.get("/:idPeca", controller.getByPecaId)
router.get("/", controller.getAll)
router.post("/", controller.create)


export default router