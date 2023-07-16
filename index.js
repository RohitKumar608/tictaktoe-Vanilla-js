import { generateTicTacToeWinnerComb, getWinner, createArr } from './utils.js'
const row = 3
var nextUser = 0
var filledGrid = 0
var winnerIs = ''
const winnerCombArr = generateTicTacToeWinnerComb(row)
const gridDivEle = document.querySelector('.display__grid')
gridDivEle.style.gridTemplateColumns = `repeat(${row}, 1fr)`

const gridArray = createArr(row)

function renderButtons(gridArray) {
  gridDivEle.innerHTML = ''
  gridArray.forEach((val, idx) => {
    const btn = document.createElement('button')
    btn.classList.add('tictacktoe-btn')
    btn.dataset.id = idx
    btn.innerText = val
    gridDivEle.append(btn)
  })
}

gridDivEle.addEventListener('click', (evt) => {
  const id = evt.target.dataset.id
  if (gridArray[id] || winnerIs || filledGrid === row * row) {
    return
  }
  const currentUser = nextUser % 2 === 0 ? 'X' : 'O'
  gridArray[id] = currentUser
  nextUser++
  filledGrid++
  const { winner, idx } = getWinner(gridArray, winnerCombArr)
  winnerIs = winner
  showTieOrWinner(
    filledGrid === row * row && !winner ? 'tie' : winner ? 'win' : '',
    winner
  )
  renderButtons(gridArray, idx)
})

function showTieOrWinner(result, winner) {
  if (result === 'tie') {
    const resultEl = document.getElementById('tie')
    resultEl.style.display = 'block'
  }
  if (result === 'win') {
    const firepowerEl = document.getElementById('firepower')
    const winnerEl = document.getElementById('winner')
    const resultEl = document.getElementById('result')
    firepowerEl.style.display = 'block'
    winnerEl.style.display = 'block'
    resultEl.innerText = `The winner of the Game is ${winner}`
  }
}

function reset() {
  const resetBtnList = document.querySelectorAll('.restart')
}

renderButtons(gridArray)
