"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { setCart } from "@/features/cart/slice";


export default function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  // Sayfa açıldığında localStorage'dan oku ve RTK'ya yükle
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      dispatch(setCart(JSON.parse(saved)));
    }
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home App</h1>

      <h2 className="text-xl font-semibold mt-6">LocalStorage Gelenler:</h2>
      {items.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {items.map((i, idx) => (
            <li key={idx} className="text-green-600">
              {i}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Henüz veri yok.</p>
      )}
    </div>
  );
}
