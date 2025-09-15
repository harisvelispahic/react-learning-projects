import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(prevState, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...prevState.items];
    const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload.item.id);

    if (existingCartItemIndex !== -1) {
      const existingCartItem = updatedItems[existingCartItemIndex];
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.payload.item, quantity: 1 });
    }

    return {
      ...prevState,
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = prevState.items.findIndex((cartItem) => cartItem.id === action.payload.id);

    const existingCartItem = prevState.items[existingCartItemIndex];
    const updatedItems = [...prevState.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      ...prevState,
      items: updatedItems,
    };
  }
  if (action.type === "CLEAR_CART") {
    return { ...prevState, items: [] };
  }
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    cartDispatch({ type: "ADD_ITEM", payload: { item } });
  }

  function removeItem(id) {
    cartDispatch({ type: "REMOVE_ITEM", payload: { id } });
  }

  function clearCart() {
    cartDispatch({ type: "CLEAR_CART" });
  }

  const cartCtx = {
    items: cartState.items,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>;
}
