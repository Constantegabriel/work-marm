"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom"; // Importa ReactDOM para Portals
import { useCart } from "../context/CartContext"; // Ajuste o caminho para o contexto do carrinho
import { FaRegTrashAlt } from "react-icons/fa";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart } = useCart();

  // Bloqueia a rolagem quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloqueia a rolagem do corpo
    } else {
      document.body.style.overflow = "auto"; // Restaura a rolagem do corpo
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Função para formatar os itens do carrinho como mensagem do WhatsApp
  const handleSendToWhatsApp = () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const phoneNumber = "48998143419"; // Substitua pelo número do WhatsApp do destinatário
    let message = "Olá, gostaria de saber mais sobre os seguintes itens:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.title}*\n`;
      message += `Preço: R$ ${item.price.toFixed(2)}\n`;
      if (item.quantity > 1) message += `Quantidade: ${item.quantity}\n`;
      message += "\n";
    });

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank"); // Abre o WhatsApp em uma nova guia
  };

  // Conteúdo do Modal
  const modalContent = (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-[1050]" // Overlay com z-index alto
        />
      )}

      {/* Drawer Lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-xl z-[1100] transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-3xl text-gray-600 hover:text-red-500 cursor-pointer"
          aria-label="Fechar"
        >
          &times;
        </button>

        {/* Conteúdo do Carrinho */}
        <div className="p-5 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Seu Carrinho</h2>

          {cart.length === 0 ? (
            <p className="text-center text-lg text-gray-700">
              Seu carrinho está vazio.
            </p>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.description || "Sem descrição"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Botão de Enviar para o WhatsApp */}
          {cart.length > 0 && (
            <button
              onClick={handleSendToWhatsApp}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Enviar para WhatsApp
            </button>
          )}
        </div>
      </div>
    </>
  );

  // Usa React Portals para renderizar o modal no body
  return ReactDOM.createPortal(modalContent, document.body);
}
