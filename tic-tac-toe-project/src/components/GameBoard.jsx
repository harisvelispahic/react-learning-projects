

export default function GameBoard({ onSelectSquare, board }) {
  // let gameBoard = intialGameBoard;

  // for (let turn of turns) {
  //   const { square, player } = turn;
  //   const { row, col } = square;
  //   gameBoard[row][col] = player;
  // }

  //   const [gameBoard, setGameBoard] = useState(intialGameBoard);

  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ]; // Create a copy of the board
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedBoard;
  //     });

  //     onSelectSquare();
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={!!playerSymbol}
                  // The !! is a JavaScript trick used to convert any value to a boolean.
                  // Alternatively: disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
