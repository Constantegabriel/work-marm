"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string; // Adicionada a propriedade `description`
  quantity: number; // Quantidade do item no carrinho
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void; // Adiciona ao carrinho (quantidade padrão = 1)
  removeFromCart: (id: number) => void; // Remove item do carrinho
  updateQuantity: (id: number, quantity: number) => void; // Atualiza a quantidade de um item
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Inicializa o estado do carrinho a partir do localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Salva o carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Adiciona produto ao carrinho
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Incrementa a quantidade se o item já existe
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Adiciona o novo item ao carrinho
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove produto do carrinho
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Atualiza a quantidade de um produto no carrinho
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
