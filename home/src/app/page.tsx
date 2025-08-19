"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/slice";
import { Product } from "../services/types";

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  const handleClick = () => {
    dispatch(addItem("selam"));
  };

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products`,
          { next: { revalidate: 10 } } 
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Ürünler alınırken hata oluştu:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 bg-red-500">Home App</h1>

      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        selam ekle
      </button>

      <h2 className="text-xl font-semibold mb-4">Ürünler</h2>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            {p.title} - ₺{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
