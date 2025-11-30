import { prisma } from "../client.js";

export const etapaRepository = {
  async getAll() {
    try {
      return await prisma.etapa.findMany();
    } catch (err) {
      console.error("Erro ao buscar todas as etapas:", err);
      throw new Error("Erro ao buscar etapas");
    }
  },

  async getById(id: number) {
    try {
      return await prisma.etapa.findUnique({ where: { id_etapa: id } });
    } catch (err) {
      console.error(`Erro ao buscar etapa com id ${id}:`, err);
      throw new Error("Erro ao buscar etapa");
    }
  },

  async create(data: any) {
    try {
      return await prisma.etapa.create({ data });
    } catch (err) {
      console.error("Erro ao criar etapa:", err);
      throw new Error("Erro ao criar etapa");
    }
  },

  async update(id: number, data: any) {
    try {
      return await prisma.etapa.update({ where: { id_etapa: id }, data });
    } catch (err) {
      console.error(`Erro ao atualizar etapa com id ${id}:`, err);
      throw new Error("Erro ao atualizar etapa");
    }
  },

  async delete(id: number) {
    try {
      return await prisma.etapa.delete({ where: { id_etapa: id } });
    } catch (err) {
      console.error(`Erro ao deletar etapa com id ${id}:`, err);
      throw new Error("Erro ao deletar etapa");
    }
  },

};
