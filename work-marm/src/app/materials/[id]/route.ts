"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Material {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function MaterialDetails() {
  const { id } = useParams(); // Obtém o ID da URL
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchMaterial = async () => {
      try {
        const res = await fetch(`/api/materials/${id}`);
        if (!res.ok) {
          throw new Error("Erro ao buscar o material. Verifique se o ID é válido.");
        }
        const data = await res.json();
        setMaterial(data);
      } catch (err: any) {
        setError(err.message || "Erro inesperado ao carregar o material.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!material) {
    return <p className="text-center text-gray-500 mt-10">Material não encontrado.</p>;
  }

  return (
    <div className="container mx-auto p-6 mt-[100px]">
      <img
        src={material.imageUrl}
        alt={material.title}
        className="w-full h-64 object-cover mb-6 rounded shadow-md"
      />
      <h1 className="text-3xl font-bold">{material.title}</h1>
      <p className="text-gray-700 mt-2">Preço: R$ {material.price.toFixed(2)}</p>
      {material.description && (
        <p className="text-gray-600 mt-4">{material.description}</p>
      )}
    </div>
  );
}
