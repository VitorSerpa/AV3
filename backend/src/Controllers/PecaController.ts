import { Request, Response } from "express";
import { pecaRepository } from "../DAL/Repository/PecaRepository.js";

export async function getAll(req: Request, res: Response) {
    const pecas = await pecaRepository.getAll(); 
    res.json(pecas);
}

export async function create(req: Request, res: Response) {
    const novaPeca = await pecaRepository.create(req.body);
    res.json(novaPeca);
}

export async function remove(req: Request, res: Response) {
    const deletada = await pecaRepository.delete(Number(req.params.id)); 
    res.json(deletada);
}

export async function update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;

    try {
        const existingPeca = await pecaRepository.getById(id);
        if (!existingPeca) {
            return res.status(404).json({ error: "Peça não encontrada" });
        }

        const atualizada = await pecaRepository.update(id, data);
        res.json(atualizada);
    } catch (err) {
        console.error(`Erro ao atualizar peça com id ${id}:`, err);
        res.status(500).json({ error: "Erro ao atualizar peça" });
    }
}

