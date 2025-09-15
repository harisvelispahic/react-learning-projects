import { useContext } from "react";
import logoImg from "../assets/logo.jpg";

import Button from "./UI/Button.jsx";
import { CartContext } from "../store/cart-context.jsx";
import { UserProgressContext } from "../store/user-progress-context.jsx";

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  function handleShowCart() {
    showCart();
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalItems})
        </Button>
      </nav>
    </header>
  );
}
