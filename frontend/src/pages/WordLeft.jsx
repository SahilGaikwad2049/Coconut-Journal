export function WordLeft({ guess, stat, curRow }) {
    const keyboard = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
    ];

    function getKeyStatus(letter) {
        let status = '';
        
        for (let i = 0; i < curRow; i++) {
            const guessWord = guess[i];
            const statuses = stat[i];
            
            if (!guessWord || !statuses) continue;
            
            for (let j = 0; j < guessWord.length; j++) {
                if (guessWord[j] === letter) {
                    console.log(`Found ${letter} at position ${j}, status: ${statuses[j]}`);
                    if (statuses[j] === 'correct') {
                        return 'correct';
                    } else if (statuses[j] === 'present' && status !== 'correct') {
                        status = 'present';
                    } else if (statuses[j] === 'absent' && !status) {
                        status = 'absent';
                    }
                }
            }
        }
        
        return status;
    }

    return(
        <>
            <div>
                <div className=" imptext title wrd">
                    RULES AND REGS
                </div>
                <div className="pr">
                    <div className="line"></div>
                </div>
            </div>
            <div className="imptext">
                <div className="lists">
                    <ul>
                        <li>Word might be a proper noun.</li>
                        <li>Word might be of Hindi origins.</li>
                        <li>Each guess must be a valid five-letter word.</li>
                        <li>Press ENTER to submit your guess.</li>
                        <li>Press SHIFT to delete (if your backspace key is broken).</li>
                        <li>No hints available (author forgot to code hints section).</li>
                        <li>The dummy keyboard below tracks your guesses.</li>
                    </ul>
                </div>
                <div>
                <div className="pr">
                    <div className="line kyu"></div>
                </div>
                </div>
                <div className="imptext title">
                    KEYBOARD
                </div>
                <div className="pr">
                    <div className="line"></div>
                </div>
                <div className="keyboard">
                    {keyboard.map((row, rowIdx) => (
                        <div className="keyboard-row" key={rowIdx}>
                            {row.map((key) => {
                                const keyStatus = key.length === 1 ? getKeyStatus(key) : '';
                                return (
                                    <button
                                        key={key}
                                        className={`key ${key.length > 1 ? 'key-large' : ''} ${keyStatus}`}
                                    >
                                        {key}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div className="pr bey">
                <div className="line"></div>
            </div>
        </>
    )
}