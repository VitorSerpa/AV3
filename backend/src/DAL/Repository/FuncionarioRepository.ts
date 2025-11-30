import { prisma } from "../client.js";

export const funcionarioRepository = {
    async getAll() {
        try {
            return await prisma.funcionario.findMany();
        } catch (err) {
            console.error("Erro ao buscar todas as funcionarios:", err);
            throw new Error("Erro ao buscar funcionarios");
        }
    },

    async getById(id: number) {
        try {
            return await prisma.funcionario.findUnique({
                where: { id_funcionario: id },
            });
        } catch (err) {
            console.error(`Erro ao buscar funcionario com id ${id}:`, err);
            throw new Error("Erro ao buscar funcionario");
        }
    },

    async getEtapasById(id: number) {
        try {
            const funcionario = await prisma.funcionario.findUnique({
                where: { id_funcionario: id },
                include: {
                    funcionario_etapa: {
                        include: {
                            etapa: true,
                        },
                    },
                },
            });

            if (!funcionario) return null;

            const etapas = funcionario.funcionario_etapa.map((fe) => fe.etapa);
            return etapas;
        } catch (err) {
            console.error(
                `Erro ao buscar etapas do funcionario com id ${id}:`,
                err
            );
            throw new Error("Erro ao buscar etapas do funcionário");
        }
    },

    async create(data: any) {
        try {
            return await prisma.funcionario.create({ data });
        } catch (err) {
            console.error("Erro ao criar funcionario:", err);
            throw new Error("Erro ao criar funcionario");
        }
    },

    async update(id: number, data: any) {
        try {
            return await prisma.funcionario.update({
                where: { id_funcionario: id },
                data,
            });
        } catch (err) {
            console.error(`Erro ao atualizar funcionario com id ${id}:`, err);
            throw new Error("Erro ao atualizar funcionario");
        }
    },

    async delete(id: number) {
        try {
            return await prisma.funcionario.delete({
                where: { id_funcionario: id },
            });
        } catch (err) {
            console.error(`Erro ao deletar funcionario com id ${id}:`, err);
            throw new Error("Erro ao deletar funcionario");
        }
    },
};
