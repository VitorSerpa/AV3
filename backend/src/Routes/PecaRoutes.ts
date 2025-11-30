import { Router } from "express"
import * as controller from "../Controllers/PecaController.js"

const router = Router()

router.get("/", controller.getAll)
router.put("/:id", controller.update)
router.post("/", controller.create)
router.delete("/:id", controller.remove)

export default router