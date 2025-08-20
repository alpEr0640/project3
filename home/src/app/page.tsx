"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/slice";
import { Product } from "../services/types";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
          next: { revalidate: 10 },
        });
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
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        🛍️ Ürünler
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <Image
              src={p.image}
              alt={p.title}
              width={100}
              height={100}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold line-clamp-2 mb-2">
              {p.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {p.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xl font-bold text-green-600">
                ₺{p.price}
              </span>
              <button
                onClick={() => {
                  dispatch(
                    addItem({
                      id: p.id,
                      name: p.title,
                      price: p.price,
                      quantity: 1,
                      image: p.image,
                    })
                  );
                  toast.success("Ürün sepete eklendi!");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-lg transition-colors"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
