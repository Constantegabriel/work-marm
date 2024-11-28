import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { userId, adId } = req.body;

    if (!userId || !adId) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      await prisma.cartItem.deleteMany({
        where: { cart: { userId }, adId },
      });

      return res.status(200).json({ message: "Item removido do carrinho." });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao remover do carrinho." });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  res.status(405).end(`Método ${req.method} não permitido.`);
}
