import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário é obrigatório." });
    }

    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { ad: true } } },
      });

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: "Carrinho vazio." });
      }

      const cartDetails = cart.items
        .map((item) => `${item.quantity}x ${item.ad.title} - R$${item.ad.price}`)
        .join("\n");

      const whatsappMessage = `Olá! Gostaria de saber mais sobre os seguintes produtos:\n\n${cartDetails}\n\nAguardo retorno!`;

      const whatsappLink = `https://wa.me/55XXXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;

      return res.status(200).json({ whatsappLink });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao gerar link do WhatsApp." });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Método ${req.method} não permitido.`);
}
