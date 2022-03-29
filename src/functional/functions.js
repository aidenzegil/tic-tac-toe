
var human = "O"
var bot = "X"

var fc = 0
console.log("function calls: " + fc)

function minimax(newBoard, player){
  fc++
  var availSpots = getNullIndexes(newBoard)
  console.log(availSpots)

  if (winning(newBoard, human)){
     return {score:-1}
  }
	else if (winning(newBoard, bot)){
    return {score:1}
	}
  else if (availSpots.length === 0){
  	return {score:0}
  }

  var moves = []

  for (var index = 0; index < availSpots.length; index++){
    var move = {}
  	// move.index = newBoard[availSpots[i]]
    move.index = newBoard[availSpots[index]]
    console.log(move.index)
    newBoard[availSpots[index]] = player

    if (player === bot){
      move.score = minimax(newBoard, human).score
    }
    else{
      move.score = minimax(newBoard, bot).score
    }
    // newBoard[availSpots[i]] = savedBoard
    (newBoard[availSpots[index]] = move.index)
    moves.push(move)
  }

  var bestMove
  if(player === bot){
    var bestScore = -1000
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score
        // bestMove = i
        bestMove = moves[i].index
      }
    }
  }else{
    bestScore = 1000
    for(i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score
        bestMove = moves[i].index
        // bestMove = i
      }
    }
  }
  return moves[bestMove]
}

function getNullIndexes(arr) {
  var indexes = [], i // creates empty indexes array
  for(i = 0; i < arr.length; i++) //loops through array
      if (arr[i] === null) // finds index of null
          indexes.push(i) // pushes index to new array
  return indexes; 
}


// function emptyIndexies(board){
//   return  board.filter(s => s !== "O" && s !== "X")
// }

function gameOver(newBoard) {
  if (winning(newBoard, human)){
    alert("Congratulations, Game won!")
    return true
    }
  else if (winning(newBoard, bot)){
    alert("Uh Oh, You Lost!")
  return true
    }
  else if (getNullIndexes(newBoard).length === 0){
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

export{minimax, human, bot, gameOver, getNullIndexes}