"use client";

import Image from "next/image";
import company from "../../../public/img/quarto.jpg";

export default function Empresa() {
  return (
    <section className="bg-gray-100 mt-[69px] min-h-screen py-16 px-8 md:px-20">
      {/* Título da página */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Sobre Nós
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Conheça mais sobre nossa história, missão, visão e valores.
        </p>
      </div>

      {/* Sobre a Empresa */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nossa História</h2>
        <p className="text-gray-600 leading-relaxed">
          Fundada em Florianópolis, a nossa empresa nasceu com o propósito de
          transformar ambientes através de pedras e mármores de alta qualidade.
          Ao longo dos anos, nos tornamos referência no mercado, graças ao
          compromisso com a excelência e o atendimento personalizado aos
          clientes.
        </p>
      </div>

      {/* Missão, Visão e Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Missão */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Missão</h3>
          <p className="text-gray-600">
            Proporcionar beleza e funcionalidade aos ambientes, oferecendo
            produtos e serviços de alta qualidade que superem as expectativas
            dos nossos clientes.
          </p>
        </div>

        {/* Visão */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Visão</h3>
          <p className="text-gray-600">
            Ser reconhecida como a melhor empresa de mármores e granitos do
            Brasil, referência em inovação, sustentabilidade e atendimento.
          </p>
        </div>

        {/* Valores */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Valores</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Compromisso com a qualidade</li>
            <li>Ética e transparência</li>
            <li>Inovação constante</li>
            <li>Valorização dos clientes e colaboradores</li>
            <li>Sustentabilidade</li>
          </ul>
        </div>
      </div>

      {/* Imagem Inspiradora */}
      <div className="mt-12">
        <div className="w-full h-80 relative">
          <Image
            src={company}
            alt="Imagem da empresa"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
