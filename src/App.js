import React, { useState, useEffect } from "react";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const moveStyle = {
  fontSize: 18,
  color: "black",
};

const buttonMoveStyle = { width: "100%", height: "100%" };

function Square(props) {
  return (
    <div className="square" style={squareStyle}>
      <button
        style={buttonMoveStyle}
        onClick={() => props.handleClick(props.identifier)}
      >
        {props.state && <span style={moveStyle}>{props.state}</span>}
      </button>
    </div>
  );
}

function Board() {
  const size = 3;
  const sizeArr = Array(size).fill(1);
  const [xos, setXos] = useState(Array(size * size));
  const [moveNo, setMoveNo] = useState(0);

  const onClickSquare = (id) => {
    if (xos[id]) return;

    const xosClone = JSON.parse(JSON.stringify(xos));
    xosClone[id] = moveNo % 2 === 0 ? "X" : "O";
    setXos(xosClone);
    setMoveNo((prev) => prev + 1);
  };

  const onReset = () => {
    setXos(Array(size * size));
    setMoveNo(0);
  };

  const delay = (d, f) => {
    setTimeout(f, d);
  };

  useEffect(() => {
    const j = parseInt(size / 2);
    let sumFirstDiag = 1;
    for (let l = 0; l < size - 1; l++) {
      if (
        xos[l * (size + 1)] === xos[(l + 1) * (size + 1)] &&
        xos[l * (size + 1)]
      ) {
        sumFirstDiag++;
      }
    }

    if (sumFirstDiag === size) {
      delay(100, () => {
        alert(`${xos[j * j - 1]} Wins main diagonal!`);
        onReset();
      });
      return;
    }

    let sumSecondDiag = 1;
    for (let k = 0; k < size - 1; k++) {
      if (
        xos[(size - 1) * (k + 1)] === xos[(size - 1) * (k + 2)] &&
        xos[(size - 1) * (k + 1)]
      )
        sumSecondDiag++;
    }

    if (sumSecondDiag === size) {
      delay(100, () => {
        alert(`${xos[size - 1]} Wins secondary diag!`);
        onReset();
      });
      return;
    }

    for (let i = 0; i < size; i++) {
      if (
        xos[i * size + j] === xos[i * size + j - 1] &&
        xos[i * size + j] === xos[i * size + j + 1] &&
        xos[i * size + j]
      ) {
        delay(100, () => {
          alert(`${xos[i * size + j]} Wins rows!`);
          onReset();
        });
        return;
      }
      if (
        xos[j * size + i] === xos[(j - 1) * size + i] &&
        xos[j * size + i] === xos[(j + 1) * size + i] &&
        xos[j * size + i]
      ) {
        delay(100, () => {
          alert(`${xos[j * size + i]} Wins column!`);
          onReset();
        });
        return;
      }
    }
  }, [xos]);

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{moveNo % 2 === 0 ? "X" : "O"}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>None</span>
      </div>
      <button style={buttonStyle} onClick={onReset}>
        Reset
      </button>
      <div style={boardStyle}>
        {sizeArr.map((el, indexRow) => (
          <div key={`row-${indexRow}`} className="board-row" style={rowStyle}>
            {sizeArr.map((el, colIndex) => {
              const identifier = indexRow * size + colIndex;
              return (
                <Square
                  key={identifier}
                  identifier={identifier}
                  handleClick={onClickSquare}
                  state={xos[identifier]}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game;
