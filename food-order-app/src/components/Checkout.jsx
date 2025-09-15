import { useContext, useActionState } from "react";
import Modal from "./UI/Modal.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import Error from "./Error.jsx";

import { CartContext } from "../store/cart-context.jsx";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "../store/user-progress-context.jsx";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp("http://localhost:3000/orders", requestConfig);

  const [formState, formAction, pending] = useActionState(checkoutAction, { errors: null });

  const cartTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  async function checkoutAction(prevFormState, formData) {
    const fullName = formData.get("full-name").trim();
    const email = formData.get("email").trim();
    const street = formData.get("street").trim();
    const postalCode = formData.get("postal-code").trim();
    const city = formData.get("city").trim();

    // Validation, however the browser is already doing it, because it is configured to do so in the Input components
    const errors = [];
    if (fullName.length < 5) {
      errors.push("Full Name must be at least 5 characters long.");
    }
    if (!email.includes("@")) {
      errors.push("Email must be valid.");
    }
    if (street.length === 0) {
      errors.push("Street must not be empty.");
    }
    if (postalCode.length === 0) {
      errors.push("Postal Code must not be empty.");
    }
    if (city.length === 0) {
      errors.push("City must not be empty.");
    }

    if (errors.length > 0) {
      return {
        ...prevFormState,
        errors,
        enteredValues: {
          fullName,
          email,
          street,
          postalCode,
          city,
        },
      };
    }

    // handle POST request logic
    const order = {
      order: {
        items,
        customer: {
          email,
          name: fullName,
          street,
          ["postal-code"]: postalCode,
          city,
        },
      },
    };

    await sendRequest(JSON.stringify(order));
    return { errors: null };
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={hideCheckout}>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (pending) actions = <span>Sending order data...</span>;

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email withing the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={hideCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" id="full-name" type="text" />
        <Input label="Email Adress" id="email" type="email" />
        <Input label="Street" id="street" type="text" />

        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {error && <Error title="Failed to submit order." message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
