import { useState, useEffect } from "react";
import Square from "./Square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isAiTurn, setIsAiTurn] = useState(false);
  const [vsAI, setVsAI] = useState(false); // toggle between AI and 2-player

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  function handleClick(index) {
    if (squares[index] || winner) return;

    // If vs AI mode and it's AI turn, ignore clicks
    if (vsAI && !xIsNext) return;

    const newSquares = [...squares];
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    if (vsAI) {
      setIsAiTurn(true);
    }
  }

  useEffect(() => {
    if (vsAI && isAiTurn && !winner && !isDraw) {
      const emptyIndices = squares
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);

      if (emptyIndices.length === 0) return;

      // AI picks random empty square
      const aiMove =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

      const newSquares = [...squares];
      newSquares[aiMove] = "O";

      const timer = setTimeout(() => {
        setSquares(newSquares);
        setXIsNext(true);
        setIsAiTurn(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isAiTurn, squares, winner, isDraw, vsAI]);

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setIsAiTurn(false);
  }

  function toggleMode() {
    resetGame();
    setVsAI(!vsAI);
  }

  function renderSquare(i) {
    return <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />;
  }

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#eee",
        paddingTop: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <button
        onClick={toggleMode}
        style={{
          marginBottom: "20px",
          padding: "8px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: vsAI ? "#4caf50" : "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = vsAI ? "#388e3c" : "#d32f2f";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = vsAI ? "#4caf50" : "#f44336";
        }}
      >
        {vsAI
          ? "Playing vs AI (Click to Switch to 2 Player)"
          : "Playing 2 Player (Click to Play vs AI)"}
      </button>

      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a Draw!"
          : vsAI
          ? xIsNext
            ? "Your turn (X)"
            : "AI's turn (O)"
          : `Next Player: ${xIsNext ? "X" : "O"}`}
      </h2>

      <div
        style={{
          display: "inline-block",
          backgroundColor: "#222",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 0 20px #000",
        }}
      >
        <div>{[0, 1, 2].map(renderSquare)}</div>
        <div>{[3, 4, 5].map(renderSquare)}</div>
        <div>{[6, 7, 8].map(renderSquare)}</div>

        {/* Restart Game Button here */}
        <button
          onClick={resetGame}
          style={{
            marginTop: "25px",
            padding: "12px 28px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2979ff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(41, 121, 255, 0.6)",
            transition: "background-color 0.3s",
            display: "block",
            width: "100%",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1c54b2")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2979ff")}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}