import { Router } from "express"
import * as controller from "../Controllers/EtapaController.js"

const router = Router()

router.get("/", controller.getAll)
router.post("/", controller.create)
router.post("/etapaFuncionario", controller.createEtapaFuncionario)
router.post("/etapaAeronave", controller.atribuirEtapaAeronave)

export default router