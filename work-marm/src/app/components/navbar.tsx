"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/img/logo_marmo.png";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartDrawer from "./CartDrawer"; // Certifique-se de ajustar o caminho do arquivo
import { useCart } from "../context/CartContext"; // Use o contexto do carrinho

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart(); // Obtém o carrinho do contexto

  // Calcula a quantidade total de itens no carrinho
  const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;


  

  return (
    <nav className="bg-gray-900 bg-opacity-60 backdrop-blur-md fixed top-0 z-[900] w-full text-white px-6 py-6">
      <div className="flex justify-between items-center mx-[3%]">
        {/* Logo */}
        <div className="w-[100px]">
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

        {/* Botão do Menu Hambúrguer e Ícone do Carrinho */}
        <div className="flex items-center gap-4">
          {/* Ícone do Carrinho para telas menores */}
          <button
            className="relative flex items-center md:hidden"
            onClick={() => setCartOpen(true)}
          >
            <AiOutlineShoppingCart className="text-[28px] mt-[6px]" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-600 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Botão do Menu Hambúrguer */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-[38px] focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden items-center md:flex text-[16px] gap-8 font-medium">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/materials" className="hover:text-gray-300">
            Materiais
          </Link>
          <Link href="/services" className="hover:text-gray-300">
            Serviços
          </Link>
          <Link href="/enterprise" className="hover:text-gray-300">
            Empresa
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contato
          </Link>

          {/* Botão do Carrinho com Badge */}
          <button
            className="relative flex py-2 px-3 gap-2 rounded-xl bg-gray-800 items-center"
            onClick={() => setCartOpen(true)}
          >
            Seu Carrinho
            <AiOutlineShoppingCart className="text-[25px]" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-600 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Links (Mobile) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 text-[16px] font-medium text-left px-[5%] py-4 rounded-md">
          <Link
            href="/"
            className="hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/materials"
            className="hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Materiais
          </Link>
          <Link
            href="/services"
            className="hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Serviços
          </Link>
          <Link
            href="/enterprise"
            className="hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Empresa
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Contato
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              setCartOpen(true);
            }}
            className="flex items-center gap-2"
          >
            Carrinho <AiOutlineShoppingCart className="text-[25px]" />
            {totalItems > 0 && (
              <span className="ml-2 bg-red-600 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Modal do Carrinho */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}
