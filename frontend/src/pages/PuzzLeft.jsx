import { useEffect, useState } from "react";

const GRID = 3;

function shuffle(arr) {
    return[...arr].sort(() => Math.random()-0.5);
}

function createTiles() {
    return shuffle(
        Array.from({ length: GRID*GRID }, (_, i) => ({
            id: i,
            correctInd: i,
        }))
    )
}

export function PuzzLeft({selImg}) {
    const [tiles, setTiles] = useState([]);
    const [selected, setSelected] = useState(null);

    let solved = false;
    solved = tiles.every(
        (tile, idx) => tile.correctInd === idx
    );
    
    useEffect(() => {
        if(selImg) {
            setTiles(createTiles())
        }
    }, [selImg]);

    function handleClick(index) {
        if(selected === null) {
            setSelected(index)
        }
        else {
            const newTiles = [...tiles];
            [newTiles[selected], newTiles[index]] = [
                newTiles[index],
                newTiles[selected],
            ];
            setTiles(newTiles);
            setSelected(null);
        }
    }

    // if (!selImg) {
    //     return <p>Select an image on the right →</p>;
    // }

    return(
        <>
            <div>
                <div className=" imptext title">
                    Jigsaw Puzzle
                </div>
                <div className="pr">
                    <div className="line"></div>
                </div>
            </div>
            <div className="fl">
                <div className="puzzle">
                    {tiles.map((tile, index) => (
                        <div
                            key={tile.id}
                            className={`tile ${selected === index ? "selected" : ""}`}
                            onClick={(e)=>{
                                e.stopPropagation();
                                handleClick(index)
                            }}
                            style={{
                                backgroundImage: `url(${selImg})`,
                                backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                                backgroundPosition: `
                                ${(tile.correctInd % GRID) * (100 / (GRID - 1))}% 
                                ${Math.floor(tile.correctInd / GRID) *
                                    (100 / (GRID - 1))}%
                                `,
                            }}
                        >
                        </div>
                    ))}
                </div>
                <div className="imptext">
                    {selImg && solved && (<div className="solved">WOWWZERRS!!!</div>)}
                </div>
            </div>
        </>
    )
}