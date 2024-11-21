import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Método GET para buscar todos os materiais
export async function GET() {
  try {
    const materials = await prisma.ad.findMany(); // Busca todos os anúncios no banco de dados
    return NextResponse.json(materials);
  } catch (error) {
    console.error("Erro ao buscar materiais:", error);
    return NextResponse.json(
      { error: "Erro ao buscar materiais." },
      { status: 500 }
    );
  }
}

// Método POST para adicionar novo material
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Verifique se todos os campos obrigatórios estão presentes
    const { title, price, description, image } = body;

    if (!title || !price || !image) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    // Certifique-se de que o preço seja um número
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      return NextResponse.json(
        { error: "O preço deve ser um número válido." },
        { status: 400 }
      );
    }

    // Crie o novo material no banco de dados
    const newMaterial = await prisma.ad.create({
      data: {
        title,
        price: priceNumber,
        description,
        imageUrl: image, // Certifique-se de usar o nome correto do campo no Prisma
      },
    });

    return NextResponse.json(newMaterial);
  } catch (error) {
    console.error("Erro ao adicionar material:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar material." },
      { status: 500 }
    );
  }
}

// Método DELETE para excluir material pelo ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Verifique se o ID foi fornecido
    if (!id) {
      return NextResponse.json(
        { error: "ID do material não fornecido." },
        { status: 400 }
      );
    }

    // Tenta excluir o material do banco de dados
    await prisma.ad.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: "Material excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir material:", error);
    return NextResponse.json(
      { error: "Erro ao excluir material." },
      { status: 500 }
    );
  }
}
