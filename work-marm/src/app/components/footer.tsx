"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/img/logo_marmo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
        {/* Informações da empresa */}
        <div className="mt-[20px]">
          <div className="w-[80px]">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Logo Marmoraria Florianópolis"
                width={200}
                height={50}
                className="absolute object-contain"
              />
            </Link>
          </div>
          <p className="text-sm mt-10 leading-relaxed">
            Na Marmoraria Florianópolis, transformamos projetos em realidade 
            com mármores e granitos de alta qualidade, unindo elegância, 
            durabilidade e acabamentos impecáveis. Nosso compromisso é 
            entregar soluções que encantam e superam expectativas.
          </p>
        </div>

        {/* Localização */}
        <div>
          <h1 className="text-lg font-bold">ONDE NOS ENCONTRAR</h1>
          <p className="text-sm mt-4 leading-relaxed">
          R. Gregório Flôr, 170 - Rio Caveiras, Biguaçu - SC, 88161-780
          </p>
          <p className="text-sm mt-2">CEP: 88161-780</p>
        </div>

        {/* Contato */}
        <div>
          <h1 className="text-lg font-bold">FALE CONOSCO</h1>
          <p className="text-sm mt-4">Fone: (48) 3238-0505</p>
          <p className="text-sm mt-2">WhatsApp: (48) 99844-2768</p>
          <p className="text-sm mt-2">Email: teste@gmail.com</p>
        </div>
      </div>

      {/* Créditos */}
      <div className="text-center mt-8">
        <h1 className="text-sm">
          Desenvolvido em 2024 por{" "}
          <Link
            href="https://www.instagram.com/constante.design_/?utm_source=ig_web_button_share_sheet"
            className="underline hover:text-blue-400 transition"
          >
            CONSTANTE
          </Link>
        </h1>
      </div>

      
    </footer>
  );
}
