"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Material {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Redireciona para login se o usuário não estiver autenticado
  useEffect(() => {
    if (status === "unauthenticated" && typeof window !== "undefined") {
      window.location.href = "/admin";
    }
  }, [status]);

  // Busca os materiais disponíveis
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/materials");
      if (!res.ok) throw new Error("Erro ao carregar materiais.");
      const data: Material[] = await res.json();
      setMaterials(data);
      setError(null); // Limpa qualquer erro anterior
    } catch (err) {
      console.error("Erro ao carregar materiais:", err);
      setError("Erro ao carregar materiais.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este material?")) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir material.");
      alert("Material excluído com sucesso!");
      fetchMaterials();
    } catch (err) {
      console.error("Erro ao excluir material:", err);
      alert("Erro ao excluir material.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !imageFile) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description || "");
      formData.append("image", imageFile);

      const res = await fetch("/api/materials", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Erro ao adicionar material.");
      alert("Material adicionado com sucesso!");
      setTitle("");
      setPrice("");
      setDescription("");
      setImageFile(null);
      fetchMaterials();
    } catch (err) {
      console.error("Erro ao adicionar material:", err);
      alert("Erro ao adicionar material.");
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
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
                height={200}
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