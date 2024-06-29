import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart;
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://little-fashion-backend.onrender.com/api/v1/cart/get-cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
      } else {
        toast.error("Error fetching cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Error fetching cart items");
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Login Required");
        navigate("/login");
        return;
      }
      const response = await fetch(
        "https://little-fashion-backend.onrender.com/api/v1/cart/add-to-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        fetchCart();
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart");
    }
  };

  const removeOneFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Login Required");
        return;
      }
      const response = await fetch(
        `https://little-fashion-backend.onrender.com/api/v1/cart/remove-from-cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        fetchCart();
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Error removing from cart");
    }
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        addToCart,
        removeOneFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
