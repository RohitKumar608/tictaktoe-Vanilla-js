import { generateTicTacToeWinnerComb, getWinner, createArr } from './utils.js'
var row = 3
var filledGrid = 0
var winnerIs = ''
var winnerCombArr = generateTicTacToeWinnerComb(row)
const gridDivEle = document.querySelector('.display__grid')
const inputEl = document.querySelector('#matrix-input')
const resetBtnList = document.querySelector('.game-restart')

gridDivEle.style.gridTemplateColumns = `repeat(${row}, 1fr)`

var gridArray = createArr(row)

function renderButtons(gridArray, winnerIdx) {
  const winnerArr = winnerCombArr[winnerIdx] || []
  gridDivEle.innerHTML = ''
  gridArray.forEach((val, idx) => {
    const btn = document.createElement('button')
    // if user wins the game then highlight the column
    if (winnerArr.includes(idx)) {
      btn.classList.add('winner-grid')
    }
    btn.classList.add('tictacktoe-btn')
    btn.dataset.id = idx
    btn.innerText = val
    gridDivEle.append(btn)
  })
}

gridDivEle.addEventListener('click', (evt) => {
  const id = evt.target.dataset.id
  // if user win the game, cell was filled or all the cells are filled the return
  if (gridArray[id] || winnerIs || filledGrid === row * row) {
    return
  }
  const currentUser = filledGrid % 2 === 0 ? 'X' : 'O'
  gridArray[id] = currentUser

  filledGrid++
  const { winner, idx } = getWinner(gridArray, winnerCombArr)
  // check for the winner or game is tie
  winnerIs = winner
  showTieOrWinner(
    filledGrid === row * row && !winner ? 'tie' : winner ? 'win' : '',
    winner
  )
  renderButtons(gridArray, idx)
})

function getWinnerElement() {
  const winnerEl = document.getElementById('winner')
  const resultEl = document.getElementById('result')
  return {
    winnerEl,
    resultEl,
  }
}

function showTieOrWinner(result, winner) {
  const { winnerEl, resultEl } = getWinnerElement()
  if (result === 'tie') {
    winnerEl.style.display = 'block'
    resultEl.innerText = `The match was tie, please play again `
    resetBtnList.innerText = 'Play again'
  }
  if (result === 'win') {
    const firepowerEl = document.getElementById('firepower')
    firepowerEl.style.display = 'block'
    winnerEl.style.display = 'block'
    resultEl.innerText = `The winner of the Game is : ${winner}`
    document.querySelector('body').classList.add('winner')
    resetBtnList.innerText = 'Play again'
  }
}

function reset() {
  updateTicTacToeMatrix({ target: { value: row } })
}

renderButtons(gridArray)

// reset the all the variables to initial state
function updateTicTacToeMatrix(evt) {
  const { winnerEl } = getWinnerElement()
  winnerEl.style.display = 'none'
  row = +evt.target.value
  gridDivEle.style.gridTemplateColumns = `repeat(${row}, 1fr)`
  gridArray = createArr(row)
  renderButtons(gridArray)
  winnerCombArr = generateTicTacToeWinnerComb(row)
  winnerIs = ''
  filledGrid = 0
  const firepowerEl = document.getElementById('firepower')
  firepowerEl.style.display = 'none'
  document.querySelector('body').classList.remove('winner')
  resetBtnList.innerText = 'Restart'
}

inputEl.addEventListener('change', updateTicTacToeMatrix)
resetBtnList.addEventListener('click', reset)
