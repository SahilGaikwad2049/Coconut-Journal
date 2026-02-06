import { useState, useEffect } from "react";
import { AboutLeft } from "./AboutLeft";
import { AboutRight } from "./AboutRight";
import { Cover } from "./Cover";
import { Page } from "../components/Page";
import { PuzzLeft } from "./PuzzLeft";
import { PuzzRight } from "./PuzzRight";
import { WordLeft } from "./WordLeft";
import { WordRight } from "./WordRight";
import { End } from "./End";

export function Book() {
    const [open, setOpen] = useState(false)
    const [ind, setInd] = useState(0)
    const [puzImg, setPuzImg] = useState(null)
    const [guess, setGuess] = useState(Array(6).fill(""));
    const [stat, setStat] = useState(Array(6).fill(null));
    const [curRow, setCurRow] = useState(0);
    const [showEndCover, setShowEndCover] = useState(false);

    const pages = [
        {left: <AboutLeft />, right: <AboutRight />},
        {
            left: <PuzzLeft selImg = {puzImg} />, 
            right: <PuzzRight onSelImg = {setPuzImg} />
        },
        {
            left: <WordLeft guess={guess} stat={stat} curRow={curRow} />, 
            right: <WordRight 
                guess={guess} 
                setGuess={setGuess}
                stat={stat}
                setStat={setStat}
                curRow={curRow}
                setCurRow={setCurRow}
            />,
        },
    ]

    useEffect(() => {
        function handleArrowKeys(e) {
            if (!open || showEndCover) return;

            if (e.key === "ArrowRight") {
                if (ind < pages.length - 1) {
                    setInd(ind + 1);
                } else {
                    setShowEndCover(true);
                    setOpen(false);
                }
            } else if (e.key === "ArrowLeft") {
                if (ind > 0) {
                    setInd(ind - 1);
                } else {
                    setOpen(false);
                }
            }
        }

        window.addEventListener("keydown", handleArrowKeys);
        return () => window.removeEventListener("keydown", handleArrowKeys);
    }, [open, showEndCover, ind, pages.length]);

    return (
        <>  
            <div className="scene">
                {(!open && !showEndCover && (<Cover onOpen={() => setOpen(true)} />))}
                
                {showEndCover && (
                    <End onClose={() => {
                        setShowEndCover(false);
                        setOpen(true);
                        setInd(pages.length - 1);
                    }} />
                )}
                
                {(open && !showEndCover) && (
                    <div className="book">
                        <Page 
                            side = "left"
                            onClick={()=> {
                                if(!ind) {setOpen(false);}
                                else setInd(ind-1);
                            }}
                        >
                            {pages[ind].left}
                        </Page>
                        <Page 
                            side="right"
                            onClick={()=>{
                                if(ind < pages.length-1) {
                                    setInd(ind+1)      
                                } else {
                                    setShowEndCover(true);
                                    setOpen(false);
                                }
                            }}
                        >
                            {pages[ind].right}
                        </Page>
                    </div>
                )}
            </div>
        </>
    )
}