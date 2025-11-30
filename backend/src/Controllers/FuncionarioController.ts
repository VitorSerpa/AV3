import { Request, Response } from "express";
import { funcionarioRepository } from "../DAL/Repository/FuncionarioRepository.js";

export async function getAll(req: Request, res: Response) {
    try {
        const funcionario = await funcionarioRepository.getAll();

        if (!funcionario || funcionario.length === 0) {
            return res
                .status(404)
                .json({ message: "Nenhum funcionario encontrado" });
        }

        res.json(funcionario);
    } catch (err) {
        console.error(`Erro ao buscar funcionarios:`, err);
        res.status(500).json({ error: "Erro ao buscar funcionario" });
    }
}

export async function create(req: Request, res: Response) {
    const funcionario = await funcionarioRepository.create(req.body);
    res.json(funcionario);
}

export async function getEtapasById(req: Request, res: Response) {
    try {
        const funcionarioId = Number(req.params.id);

        const funcionario = await funcionarioRepository.getById(funcionarioId);
        if (!funcionario) {
            return res
                .status(404)
                .json({ message: "Funcionário não encontrado" });
        }

        const etapas = await funcionarioRepository.getEtapasById(funcionarioId);

        if (!etapas || etapas.length === 0) {
            return res
                .status(404)
                .json({ message: "Nenhuma etapa encontrada para este funcionário" });
        }

        return res.json(etapas);

    } catch (err) {
        console.error(`Erro ao buscar etapas do funcionário:`, err);
        return res.status(500).json({ error: "Erro ao buscar etapas do funcionário" });
    }
}
