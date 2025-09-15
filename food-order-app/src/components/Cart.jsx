import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import CartItem from "./CartItem.jsx";
import { CartContext } from "../store/cart-context.jsx";

import { currencyFormatter } from "../util/formatting.js";
import { UserProgressContext } from "../store/user-progress-context.jsx";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Modal className="cart" open={progress === "cart"} onClose={progress === "cart" ? hideCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => addItem(item)}
              onDecrease={() => removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        {items.length > 0 && <Button onClick={showCheckout}>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}
