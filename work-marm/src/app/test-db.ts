import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("Conexão com o banco de dados funcionando!", result);
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
