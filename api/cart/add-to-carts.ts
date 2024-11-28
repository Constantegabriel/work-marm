import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, adId, quantity } = req.body;

    if (!userId || !adId || !quantity) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const cart = await prisma.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });

      const cartItem = await prisma.cartItem.upsert({
        where: {
          cartId_adId: { cartId: cart.id, adId },
        },
        update: {
          quantity: { increment: quantity },
        },
        create: {
          cartId: cart.id,
          adId,
          quantity,
        },
      });

      return res.status(200).json(cartItem);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao adicionar ao carrinho." });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Método ${req.method} não permitido.`);
}
