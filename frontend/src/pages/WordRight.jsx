import { useEffect, useState } from "react";

const wordLength = 5;
const totalGuess = 6;

const words = [
    "POLKA", "JAMUN", "CUTIE", "BARFI", "PASTA", "POTTY", "CORNY", "PSYCH", "GREEN", "COCOA", "GARBA", "SWEET", "FUNNY", "BUNNY", "KHARI", "CRINE", "TOAST",
    "SARDI", "PARLE", "SOFTY", "BLOCK", "SILLY", "SPICY", 
];

export function WordRight({ guess, setGuess, stat, setStat, curRow, setCurRow }) {
    //My States
    const [soln, setSoln] = useState("");
    const [curGuess, setCurGuess] = useState("");
    const [over, setOver] = useState(false);
    const [won, setWon] = useState(false);

    useEffect(() => {
        const newArr = [...words].sort(() => Math.random()-0.5);
        setSoln(newArr[Math.floor(Math.random() * newArr.length)]);
    }, []);

    useEffect(() => {
        function handleKey(e) {
            if(over) return;

            if (/^[a-zA-Z]$/.test(e.key) && curGuess.length < 5) {
                setCurGuess(g => g + e.key.toUpperCase());
            }
            else if (e.key === "Shift") {
                setCurGuess(g => g.slice(0,-1));
            }
            else if (e.key === "Enter") {
                submitGuess();
            }
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [curGuess, over, soln, curRow]);

    function evalGuess(guess) {
        const res = Array(5).fill("absent");
        const solArr = soln.split("");

        for(let i = 0; i < 5; i++) {
            if(guess[i] == solArr[i]) {
                res[i] = "correct";
                solArr[i] = null;
            }
        }

        for (let i = 0; i < 5; i++) {
            if (
              res[i] === "absent" &&
              solArr.includes(guess[i])
            ) {
              res[i] = "present";
              solArr[solArr.indexOf(guess[i])] = null;
            }
        }
      
        return res;
    }

    function submitGuess() {
        if (curGuess.length !== 5) return;
    
        const newGuesses = [...guess];
        newGuesses[curRow] = curGuess;
    
        const newStatuses = [...stat];
        newStatuses[curRow] = evalGuess(curGuess);
    
        setGuess(newGuesses);
        setStat(newStatuses);
    
        if (curGuess === soln) {
          setOver(true);
          setWon(true);
        } else if (curRow === totalGuess - 1) {
          setOver(true);
          setWon(false);
        }
    
        setCurRow(r => r + 1);
        setCurGuess("");
    }

    function resetGame() {
        const newArr = [...words].sort(() => Math.random()-0.5);
        setSoln(newArr[Math.floor(Math.random() * newArr.length)]);
        setGuess(Array(totalGuess).fill(""));
        setStat(Array(totalGuess).fill(null));
        setCurGuess("");
        setCurRow(0);
        setOver(false);
        setWon(false);
    }

    return (
        <>
            <div>
                <div className="imptext title wrd">
                    WORDLE
                </div>
                <div className="pr">
                    <div className="line"></div>
                </div>
            </div>
            <div 
                className="imptext wrdle"
                onClick={e => e.stopPropagation()}
            >
                {
                    guess.map((guss, rowIdx) => (
                    <div 
                        className={`row ${won && guss === soln ? 'win' : ''}`} 
                        key={rowIdx}
                    >
                    {Array.from({ length: 5 }).map((_, colIdx) => {
                        const letter =
                        rowIdx === curRow
                            ? curGuess[colIdx] || ""
                            : guss[colIdx] || "";

                        const status =
                        stat[rowIdx]?.[colIdx] || "";

                        return (
                        <div
                            key={colIdx}
                            className={`tiled ${status}`}
                        >
                            {letter}
                        </div>
                        );
                    })}
                    </div>
                ))}
            </div>
            <div className="pr ko">
                <div className="line"></div>
            </div>
            <div className="imptext">
                {over && (
                    <div className="lol">
                        <div className="game-over">
                            <p className="result-message">
                                {won ? 'WOWWZERRS' : `${soln}`}
                            </p>
                        </div>
                        <div className="dawg">
                            <button 
                                className="reset-btn2" 
                                onClick={(e) => {
                                    resetGame();
                                    e.target.blur();
                                }}
                            >
                                RESET WORD
                            </button>
                        </div>
                    </div>   
                )}
            </div>
            <div>
                {!over && <div className="dwg">
                    <div></div>
                    <button 
                            className="reset-btn" 
                            onClick={(e) => {
                                resetGame();
                                e.target.blur();
                            }}
                        >
                            RESET WORD
                    </button>
                </div>
                }
            </div>
        </>
    )
}