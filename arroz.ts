interface simplePosition {
  x: number;
  y: number;
}

interface DangerPosition extends simplePosition {
  selfDanger: number;
  finalDanger: number;
}

function findSafestPath(dream: number[][]): number {
  const rows = dream.length;
  const cols = dream[0].length;

  let mappedPositionByDangers: DangerPosition[][] = Array.from({ length: rows }, (_, rowIndex) => 
    Array.from({ length: cols }, (_, colIndex) => ({
      x: rowIndex,
      y: colIndex,
      selfDanger: dream[rowIndex][colIndex],
      finalDanger: Infinity 
    }))
  );

  mappedPositionByDangers[0][0].finalDanger = mappedPositionByDangers[0][0].selfDanger;

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      const current = mappedPositionByDangers[rowIndex][colIndex];

      if (rowIndex > 0) {
        const top = mappedPositionByDangers[rowIndex - 1][colIndex];
        current.finalDanger = Math.min(current.finalDanger, top.finalDanger + current.selfDanger);
      }

      if (colIndex > 0) {
        const left = mappedPositionByDangers[rowIndex][colIndex - 1];
        current.finalDanger = Math.min(current.finalDanger, left.finalDanger + current.selfDanger);
      }
    }
  }

  return mappedPositionByDangers[rows - 1][cols - 1].finalDanger;
}