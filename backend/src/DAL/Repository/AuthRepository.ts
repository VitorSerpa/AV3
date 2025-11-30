import { prisma } from "../client.js";

export const authRepository = {
    async login(usuario: string, senha: string) {
        try {
            const funcionario = await prisma.funcionario.findFirst({
                where: {
                    usuario,
                    senha
                }
            });

            return funcionario || null;

        } catch (err) {
            console.error("Erro ao realizar login:", err);
            throw new Error("Erro ao realizar login");
        }
    }
};
