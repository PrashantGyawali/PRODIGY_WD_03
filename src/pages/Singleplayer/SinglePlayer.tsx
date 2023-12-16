import { useEffect, useState } from 'react';
import './SinglePlayer.css';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface WinInfo {
    winner: string;
    wincondition: string;
  }
  
  const scoreTable = {
    X: -1,
    O: 1,
    draw: 0,
  };
  

const SinglePlayer = () => {
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [turn, setTurn] = useState<string>('X');
    const [gameover, setGameover] = useState<boolean>(false);
    const [winInfo, setWinInfo] = useState<WinInfo>({ winner: "", wincondition: "" });
    const navigate=useNavigate();

    const handleBoxClick = (index: number) => {
        if(!gameover)
        {
            const newboard = [...board];
            newboard[index] = turn;
            setBoard(newboard);
            setTurn(turn === 'X' ? 'O' : 'X');
        }
    }

    const calculateWinner = (board: string[]) => {
        const winconditions = {
            row1: [0, 1, 2],
            row2: [3, 4, 5],
            row3: [6, 7, 8],
            col1: [0, 3, 6],
            col2: [1, 4, 7],
            col3: [2, 5, 8],
            diag1: [0, 4, 8],
            diag2: [2, 4, 6],
        };

        for (const [wincondition, [a, b, c]] of Object.entries(winconditions)) {
            const value = board[a];
            if (value && value === board[b] && value === board[c]) {
                return {winner:value,wincondition:wincondition};
            }
        }

        if (board.every((cell) => cell !== "")) {
            return {winner:"draw",wincondition:"draw"}; // draw
        }

        return null;
    };

    const minimax = (board: string[], depth: number, maximizingPlayer: boolean): number => {
        const result = calculateWinner(board);
        if (result !== null) {
            return scoreTable[result.winner as keyof typeof scoreTable];
        }
    
        if (maximizingPlayer) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(bestScore, score);
                }
            }
            return bestScore;
        } else {
            let minEval = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const score = minimax(board, depth + 1, true);
                    board[i] = '';
                    minEval = Math.min(minEval, score);
                }
            }
            return minEval;
        }
    };
    

    const bestMove = (board: string[]) => {
        let bestMove = -1;
        let bestScore = -Infinity;
    
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score = minimax(board, 0, false);
                board[i] = '';
    
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
    
        return bestMove;
    };


    useEffect(() => {

        setTimeout(()=>{
            const wininfo = calculateWinner(board);
            if (wininfo) {
                if (wininfo["wincondition"] !== "draw" || wininfo["wincondition"] === "draw") {
                    setGameover(true);
                    setWinInfo(wininfo);
                }
            }

            else if (turn === 'O' && !gameover) {
                const aiMove = bestMove(board);
                handleBoxClick(aiMove);
            }

        },100);
}
, [board]);


    const Box = (props: { index: number, box: String }) => {
        const { index, box } = props;
        return (
            <div
                className={`col${(index + 3) % 3 + 1} row${index < 3 ? 1 : index < 6 ? 2 : 3} box ${(!box && !gameover )? turn + "-hover" : ""} filled-${!!box}`}
                onClick={() => { !box && handleBoxClick(index) }}
            >
                {box}
            </div>
        )
    }

    const GameoverMenu=()=>{
        const handleRestart=()=>{
            setBoard(Array(9).fill(''));
            setTurn('X');
            setGameover(false);
            setWinInfo({ winner: "", wincondition: "" });
        }
        const handleExit=()=>{
            navigate("/");
        }

        return(
            <motion.div className="gameovermenu"
                    key="gameovermenu"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{duration:1}}>
                        <div className='gameoverdiv'>
                        <div className="gameovermenu-text">
                    {winInfo.wincondition!=="draw"?winInfo.winner+" won":"Draw"}
                </div>
                <div className="gameovermenu-buttons">
                    <button onClick={handleRestart}>Restart</button>
                    <button onClick={handleExit}>Exit</button>
                </div>
                        </div>

            </motion.div>
        )
    }

    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: "center", marginTop: "100px" }}>
            <div className="board">
                {board.map((box: String, index: number) => (
                    <Box key={index.toString()} index={index} box={box} />
                ))}
                <div className={"strike "+  `${gameover && `strike-${winInfo.wincondition}`}`}></div>
                <AnimatePresence>
                        {gameover && <GameoverMenu/>}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SinglePlayer;
