import Input from "./Input.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    handleInputFocus: handleEmailFocus,
    hasError: emailHasError,
  } = useInput((value) => isEmail(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    handleInputFocus: handlePasswordFocus,
    hasError: passwordHasError,
  } = useInput((value) => hasMinLength(value, 6) && isNotEmpty(value));

  function handleSubmit(event) {
    event.preventDefault();
    if (emailHasError || passwordHasError) {
      return;
    }
    console.log(emailValue, passwordValue);

    //Reset the form
    // setEnteredValues({
    //   email: "",
    //   password: "",
    // });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login (with state)</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          value={emailValue}
          error={emailHasError && "Please enter a valid email address."}
          onBlur={handleEmailBlur}
          onFocus={handleEmailFocus}
          onChange={handleEmailChange}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          value={passwordValue}
          error={passwordHasError && "Password must be at least 6 characters long."}
          onBlur={handlePasswordBlur}
          onFocus={handlePasswordFocus}
          onChange={handlePasswordChange}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
