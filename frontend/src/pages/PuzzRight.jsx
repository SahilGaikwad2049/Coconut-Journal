const imgs = [
    "/images/img1.jpeg",
    "/images/img2.jpeg",
    "/images/img3.jpeg",
    "/images/img4.jpeg",
]

export function PuzzRight({onSelImg}) {
    return(
        <>
            <div>
                <div className=" imptext title">
                    Pick Your Kuromi
                </div>
                <div className="pr">
                    <div className="line"></div>
                </div>
            </div>
            <div className="image-grid">
                {imgs.map((img, i) => {
                    return (<img 
                        className="sil"
                        key = {i}
                        src = {img}
                        onClick={(e)=> {
                            e.stopPropagation()
                            onSelImg(img)
                        }}
                    />)
                })}
            </div>
            <div className="pr yes">
                <div className="line"></div>
            </div>
            <div className="imptext no">
                *INSTRUCTION: Click on two different pieces to swap them*
            </div>
        </>
    )
}