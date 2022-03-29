import React, { useState } from 'react'
import Board from './Board'
import { human, bot, minimax, gameOver} from '../functional/functions'

const Game = () => {
    const [board, setBoard] = useState([0,1,2,3,4,5,6,7,8])
    console.log(board)
    
    const handleClick = (i) => {
        const newBoard = [...board]  
        if(newBoard[i] === human)return //checks if human occupies spot
        if(newBoard[i] === bot) return  //checks if bot occupies spot
        if(gameOver(newBoard) === true) return //checks if game is over
        newBoard[i] = human // designates clicked spot human
        setBoard(newBoard) // updates board   
        const bestSpot = minimax(newBoard, bot).index // finds index of best spot for bot
        newBoard[bestSpot] = bot // designates this spot as bot
        setBoard(newBoard) // updates board
        gameOver(newBoard) // checks for winner
    }



    function resetBoard() {
        return <button onClick={() => setBoard([0,1,2,3,4,5,6,7,8])}>
            Restart
        </button>
    }


    return (
        <div>
            <div>
            <Board squares={board} onClick={handleClick}/>
            </div>
            <p>
              {resetBoard()}
            </p>
        </div>
    )
}

export default Game
