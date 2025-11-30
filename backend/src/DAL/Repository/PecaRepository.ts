import { prisma } from "../client.js";

export const pecaRepository = {
  async getAll() {
    try {
      return await prisma.peca.findMany();
    } catch (err) {
      console.error("Erro ao buscar todas as peças:", err);
      throw new Error("Erro ao buscar peças");
    }
  },

  async getById(id: number) {
    try {
      return await prisma.peca.findUnique({ where: { id_peca: id } });
    } catch (err) {
      console.error(`Erro ao buscar peça com id ${id}:`, err);
      throw new Error("Erro ao buscar peça");
    }
  },

  async create(data: any) {
    try {
      return await prisma.peca.create({ data });
    } catch (err) {
      console.error("Erro ao criar peça:", err);
      throw new Error("Erro ao criar peça");
    }
  },

  async update(id: number, data: any) {
    try {
      return await prisma.peca.update({ where: { id_peca: id }, data });
    } catch (err) {
      console.error(`Erro ao atualizar peça com id ${id}:`, err);
      throw new Error("Erro ao atualizar peça");
    }
  },

  async delete(id: number) {
    try {
      return await prisma.peca.delete({ where: { id_peca: id } });
    } catch (err) {
      console.error(`Erro ao deletar peça com id ${id}:`, err);
      throw new Error("Erro ao deletar peça");
    }
  },
};
