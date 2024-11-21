"use client";

import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../context/CartContext"; // Certifique-se de ajustar o caminho para o contexto do carrinho
import Image from "next/image"; // Importa o componente Image do Next.js

interface Material {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Hook do contexto para adicionar ao carrinho

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch("/api/materials");
        const data = await res.json();
        setMaterials(data);
      } catch (error) {
        console.error("Erro ao buscar materiais:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Carregando materiais...</p>;
  }

  return (
    <div className="container mx-auto p-6 mt-[100px]">
      <h1 className="text-2xl font-bold mb-4">Materiais Disponíveis</h1>

      {materials.length === 0 ? (
        <p className="text-gray-500">Nenhum material encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="w-full h-40 relative mb-4">
                <Image
                  src={material.imageUrl}
                  alt={material.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h2 className="text-lg font-semibold">{material.title}</h2>
              <p className="text-gray-600">Preço: R$ {material.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">{material.description}</p>

              {/* Botão para adicionar ao carrinho */}
              <button
                onClick={() =>
                  addToCart({
                    id: material.id,
                    title: material.title,
                    price: material.price,
                    image: material.imageUrl,
                    quantity: 1, // Certifique-se de definir um valor padrão de quantidade
                  })
                }
                className="mt-4 text-[28px] text-black px-4 py-2 rounded-lg transition"
              >
                <AiOutlineShoppingCart />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
