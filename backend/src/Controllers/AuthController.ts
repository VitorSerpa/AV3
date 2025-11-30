import { Request, Response } from "express";
import { authRepository } from "../DAL/Repository/AuthRepository.js";

export async function login(req: Request, res: Response) {
    try {
        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
        }

        const funcionario = await authRepository.login(usuario, senha);

        if (!funcionario) {
            return res.status(401).json({ error: "Usuário ou senha incorretos" });
        }

        const { senha: _, ...funcionarioSemSenha } = funcionario;

        return res.json({
            message: "Login realizado com sucesso",
            user: funcionarioSemSenha
        });

    } catch (err) {
        console.error("Erro no login:", err);
        return res.status(500).json({ error: "Erro interno ao realizar login" });
    }
}