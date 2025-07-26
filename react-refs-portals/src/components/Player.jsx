import { useState } from "react";
import { useRef } from "react";

export default function Player() {
  const playerName = useRef("");
  const [enteredName, setEnteredName] = useState("unknown entity");

  function handleNameSubmit() {
    // Prevent setting an empty name
    if (!playerName.current.value.trim()) {
      return;
    }
    setEnteredName(playerName.current.value);
    playerName.current.value = ""; // Clear the input field after setting the name
  }

  return (
    <section id="player">
      <h2>Welcome {enteredName}</h2>
      <p>
        <input ref={playerName} type="text" required />
        <button onClick={handleNameSubmit}>Set Name</button>
      </p>
    </section>
  );
}
