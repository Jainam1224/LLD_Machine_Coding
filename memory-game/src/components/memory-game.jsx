import React, { useEffect, useState } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4); // Default grid size
  const [cards, setCards] = useState([]); // Array to hold card values - all cards

  const [flipped, setFlipped] = useState([]); // flipped cards
  const [solved, setSolved] = useState([]); // solved cards - correctly flipped
  const [disabled, setDisabled] = useState(false); // disable clicking for solved cards

  const [won, setWon] = useState(false); // won or not

  function handleGridSizeChange(event) {
    const newSize = parseInt(event.target.value, 10);
    if (newSize >= 2 && newSize <= 10) {
      setGridSize(newSize);
    }
  }

  function initializeGame() {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((num) => num + 1);
    const cardValues = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({
        id: index,
        number,
      }));

    setCards(cardValues);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  }

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>

      {/* Input */}
      <div className="mb-4">
        <label htmlFor="gridSize" className="mr-2">
          Grid Size: (max 10)
        </label>
        <input
          type="number"
          id="gridSize"
          min={2}
          max={10}
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border-2 border-gray-300 rounded p-2 mb-4"
        />
      </div>

      {/* Board */}
      <div
        className="grid gap-2 mb-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr)`,
          width: `${gridSize * 5.5}rem`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              className="aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
              key={card.id}
            >
              {card.number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
