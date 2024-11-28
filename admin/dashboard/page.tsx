"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image"; // Importa o componente Image do Next.js

// Definição de interface para material
interface Material {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [materials, setMaterials] = useState<Material[]>([]); // Define o tipo como Material[]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Redireciona para login se o usuário não estiver autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/admin";
    }
  }, [status]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Função para buscar materiais
  const fetchMaterials = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch("/api/materials");
      if (!res.ok) throw new Error("Erro ao carregar materiais.");
      const data: Material[] = await res.json(); // Define o tipo dos dados recebidos
      setMaterials(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao carregar materiais.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir material
  const handleDelete = async (id: number): Promise<void> => {
    const confirmDelete = confirm("Tem certeza que deseja excluir este material?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir material.");
      alert("Material excluído com sucesso!");
      fetchMaterials(); // Atualiza a lista de materiais após exclusão
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Erro inesperado ao excluir o material.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar material
  const handleAddMaterial = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!title || !price || !image) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          description,
          image,
        }),
      });
      if (!res.ok) throw new Error("Erro ao adicionar material.");
      alert("Material adicionado com sucesso!");
      setTitle("");
      setPrice("");
      setDescription("");
      setImage("");
      fetchMaterials(); // Atualiza a lista de materiais após adição
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Erro inesperado ao adicionar material.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <p>Carregando...</p>;

  return (
    <div className="container mt-[100px] mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Administrativo</h1>
      <p className="mb-4">Bem-vindo, {session?.user?.name || "Admin"}!</p>
      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white px-4 py-2 rounded-lg mb-6"
      >
        Sair
      </button>

      <h2 className="text-xl font-semibold mb-4">Adicionar Material</h2>
      <form onSubmit={handleAddMaterial} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        ></textarea>
        <input
          type="text"
          placeholder="URL da Imagem"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Adicionando..." : "Adicionar"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Materiais Existentes</h2>
      {error && <p className="text-red-500">{error}</p>}
      {materials.length === 0 ? (
        <p className="text-gray-500">Nenhum material encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <Image
                src={material.imageUrl}
                alt={material.title}
                width={300}
                height={160}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold">{material.title}</h2>
              <p className="text-gray-600">Preço: R$ {material.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">{material.description}</p>
              <button
                onClick={() => handleDelete(material.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
