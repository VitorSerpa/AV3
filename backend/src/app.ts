import express from "express";
import PecaRoutes from "./Routes/PecaRoutes.js";
import AeronaveRoutes from "./Routes/AeronaveRoutes.js"
import FuncionarioRoutes from "./Routes/FuncionarioRoutes.js"
import EtapaRoutes from "./Routes/EtapaRoutes.js"
import LoginRoutes from "./Routes/LoginRoutes.js"

import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())

app.use("/etapa", EtapaRoutes);
app.use("/peca", PecaRoutes);
app.use("/aeronave", AeronaveRoutes);
app.use("/funcionario", FuncionarioRoutes);
app.use("/login", LoginRoutes);


export default app;
