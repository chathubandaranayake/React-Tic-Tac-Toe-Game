export default function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "70px",
        height: "70px",
        margin: "6px",
        fontSize: "36px",
        fontWeight: "bold",
        color: "#eee",
        backgroundColor: "#333",
        border: "2px solid #555",
        borderRadius: "12px",
        cursor: "pointer",
        userSelect: "none",
        transition: "background-color 0.3s",
      }}
      onMouseEnter={(e) => {
        if (!value) e.target.style.backgroundColor = "#444";
      }}
      onMouseLeave={(e) => {
        if (!value) e.target.style.backgroundColor = "#333";
      }}
    >
      {value}
    </button>
  );
}