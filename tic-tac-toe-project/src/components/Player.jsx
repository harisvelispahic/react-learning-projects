import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    // When updating state, based on the previous state, we should pass a function
    // setIsEditing(!isEditing); => schedules a state update, but does not immediately change the value
    setIsEditing((prevIsEditing) => !prevIsEditing); // => still schedules a state update, but now it uses the previous state value in the current instance (snapshot)
    if (isEditing) {
      onChangeName(symbol, playerName); // Call the callback function to update the player name
    }
  }

  // we can accept "event" object as an event parameter
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={playerName} onChange={handleChange} required />
    );
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
}
