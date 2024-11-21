import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("senha321", 10); // Substitua "senhaSuperSecreta" pela senha desejada

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com", // Substitua pelo email desejado
      password: hashedPassword,
    },
  });

  console.log("Administrador criado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
