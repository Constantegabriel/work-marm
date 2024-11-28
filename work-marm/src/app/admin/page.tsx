"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Adiciona estado de carregamento
  const [error, setError] = useState<string | null>(null); // Adiciona estado para mensagens de erro

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Limpa erros anteriores

    const result = await signIn("credentials", {
      redirect: false, // Para lidar com o redirecionamento manualmente
      email,
      password,
      callbackUrl: "/admin/dashboard",
    });

    setLoading(false);

    if (result?.error) {
      setError("Login falhou! Verifique suas credenciais.");
    } else if (result?.ok) {
      // Redireciona para o dashboard ao fazer login com sucesso
      window.location.href = result.url || "/admin/dashboard";
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-medium rounded-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
