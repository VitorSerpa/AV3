import { prisma } from "../client.js";

export const funcionarioEtapaRepository = {

     async create(data: any) {
        try {
            return await prisma.funcionario_etapa.create({ data });
        } catch (err) {
            console.error("Erro ao criar funcionario:", err);
            throw new Error("Erro ao criar funcionario");
        }
    },
}