"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCart, removeFromCart } from "@/features/cart/slice";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      dispatch(setCart(JSON.parse(saved)));
    }
    setMounted(true);
  }, [dispatch]);

  if (!mounted) return null;

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Sepetim</h1>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              {item.image && (
                <Image
                  width={100}
                  height={100}
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded-md border"
                />
              )}

              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500 text-sm">Adet: {item.quantity}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-blue-600">
                  {(item.price * item.quantity).toFixed(2)} ₺
                </span>
                <button
                  className="p-2 rounded-md bg-red-100 hover:bg-red-200"
                  onClick={() => {
                    dispatch(removeFromCart(item.id));
                    toast.success("Ürün Sepetten Kaldırıldı")
                  }}
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between items-center text-lg font-semibold">
            <span>Toplam:</span>
            <span className="text-green-600">{totalPrice.toFixed(2)} ₺</span>
          </div>

          <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition" disabled>
            Ödeme Yap
          </button>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-gray-500 text-lg">Sepetiniz boş 🛒</p>
          <p className="text-gray-400 text-sm mt-2">
            Ürün ekleyerek alışverişe başlayabilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
}
