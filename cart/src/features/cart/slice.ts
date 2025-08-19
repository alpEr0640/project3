import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: string[];
}

// 🔹 İlk açılışta localStorage'dan oku
const initialState: CartState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);

      // 🔹 localStorage güncelle
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];

      // 🔹 localStorage güncelle
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify([]));
      }
    },
    setCart: (state, action: PayloadAction<string[]>) => {
      // 🔹 dışarıdan direkt localStorage'dan gelen tüm listeyi yazmak için
      state.items = action.payload;
    },
  },
});

export const { addItem, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
