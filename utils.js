export function generateTicTacToeWinnerComb(row) {
  const result = []
  let loopsRuns = 0
  for (let i = 0; i < row * row; i += row) {
    const rowArr = []
    const colArr = []
    for (let j = 0; j < row; j++) {
      rowArr[j] = i + j
      colArr[j] = loopsRuns + j * row
    }
    result.push(rowArr)
    result.push(colArr)
    loopsRuns++
  }
  // get diagonals
  const topLestDiagonal = []
  const bottomLeftDiagonal = []
  for (let i = 0; i < row; i++) {
    bottomLeftDiagonal[i] = (i + 1) * (row - 1)
    topLestDiagonal[i] = i * row + i
  }
  result.push(topLestDiagonal)
  result.push(bottomLeftDiagonal)

  return result
}

export function getWinner(state, winnerCombArr) {
  let winnerIdx = ''
  let winner = ''
  winnerCombArr.forEach((combArr, idx) => {
    if (combArr.every((idx) => state[idx] === 'X')) {
      winnerIdx = idx
      winner = 'X'
    }
    if (combArr.every((idx) => state[idx] === 'O')) {
      winnerIdx = idx
      winner = 'O'
    }
  })

  return { winner, idx: winnerIdx }
}

export function createArr(num) {
  const gridArray = []
  for (let i = 0; i < num * num; i++) {
    gridArray[i] = ''
  }
  return gridArray
}
