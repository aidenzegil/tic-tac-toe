// human
const human = "O"
// ai
const bot = "X"

var fc = 0;
console.log("function calls: " + fc)

function minimax(newBoard, player){
  fc++;
  var availSpots = emptyIndexies(newBoard)

  if (winning(newBoard, human)){
     return {score:-1}
  }
	else if (winning(newBoard, bot)){
    return {score:1}
	}
  else if (availSpots.length === 0){
  	return {score:0}
  }

  const moves = []

  for (var i = 0; i < availSpots.length; i++){
    var move = {}
  	move.index = newBoard[availSpots[i]]
    newBoard[availSpots[i]] = player

    if (player === bot){
      move.score = minimax(newBoard, human).score
    }
    else{
      move.score = minimax(newBoard, bot).score
    }
    newBoard[availSpots[i]] = move.index
    moves.push(move)
  }
  var bestMove
  if(player === bot){
    var bestScore = -1000
    for(i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }else{
    bestScore = 1000
    for(i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  return moves[bestMove]
}

function emptyIndexies(board){
  return  board.filter(s => s !== "O" && s !== "X")
}

function gameOver(newBoard) {
  if (winning(newBoard, human)){
    alert("Congratulations, Game won!")
    return true
    }
  else if (winning(newBoard, bot)){
    alert("Uh Oh, You Lost!")
  return true
    }
  else if (emptyIndexies(newBoard).length === 0){
    alert("Eh, You tied")
      return true
    }
    else {
      return false
    }
  }

function winning(board, player){
 if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
        ) {
        return true
    } else {
        return false
    }
}

export{minimax, human, bot, emptyIndexies, gameOver}