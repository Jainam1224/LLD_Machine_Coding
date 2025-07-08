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

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  function handleCardClick(id) {
    if (disabled || won) return; // Prevent action if disabled or already won

    if (flipped.length === 0) {
      setFlipped([id]); // First card flipped
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  }

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

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
              className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-colors duration-200 ${
                isFlipped(card.id)
                  ? isSolved(card.id)
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-400"
              }`}
              key={card.id}
              onClick={() => handleCardClick(card.id)}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>

      {/* Result */}
      {won && (
        <div className="mt-4 text-4xl font-bold text-green-600 animate-bounce">
          You Won!
        </div>
      )}

      {/* Reset / Play Again Btn */}
      <button
        onClick={initializeGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;
