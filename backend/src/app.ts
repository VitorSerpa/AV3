import express from "express";
import PecaRoutes from "./Routes/PecaRoutes.js";
import AeronaveRoutes from "./Routes/AeronaveRoutes.js";
import FuncionarioRoutes from "./Routes/FuncionarioRoutes.js";
import EtapaRoutes from "./Routes/EtapaRoutes.js";
import LoginRoutes from "./Routes/LoginRoutes.js";

import cors from "cors";
import fs from "fs";
import path from "path";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());

const logsDir = path.join(process.cwd(), "logs");
const logFile = path.join(logsDir, "1usuario.log");

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

function escreverLog(texto: string) {
    fs.appendFile(logFile, texto + "\n", (err) => {
        if (err) console.error("Erro ao escrever no arquivo de log:", err);
    });
}

app.use((req, res, next) => {
    const servidorInicio = process.hrtime(); 

    res.on("finish", () => {
        const diff = process.hrtime(servidorInicio);
        const tempoServidorMs = diff[0] * 1000 + diff[1] / 1e6;

        let latenciaMs: number | null = null;
        let tempoTotalMs: number;

        tempoTotalMs = tempoServidorMs; 
        

        const log = `
Data/Hora: ${new Date().toISOString()}
Rota: ${req.method} ${req.originalUrl}
Status: ${res.statusCode}

Latência: ${latenciaMs !== null ? latenciaMs + " ms" : "não enviada"}
Tempo de processamento no servidor: ${tempoServidorMs.toFixed(2)} ms
Tempo total da requisição: ${tempoTotalMs.toFixed(2)} ms
`;

        escreverLog(log);
    });

    next();
});


app.use("/etapa", EtapaRoutes);
app.use("/peca", PecaRoutes);
app.use("/aeronave", AeronaveRoutes);
app.use("/funcionario", FuncionarioRoutes);
app.use("/login", LoginRoutes);

export default app;
