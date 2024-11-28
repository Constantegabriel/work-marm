import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "seu-email@dominio.com" },
        password: { label: "Senha", type: "password", placeholder: "sua-senha" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Por favor, preencha todos os campos.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuário não encontrado.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Senha incorreta.");
        }

        // Retorna informações do usuário com o ID convertido para string
        return { id: user.id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/admin", // Página de login personalizada
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString(); // Garante que o ID é uma string
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: String(token.id), // Converte explicitamente para string
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
