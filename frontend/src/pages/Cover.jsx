export function Cover({ onOpen }) {
    return (
        <div>
            <div 
                onClick={onOpen}
            >
                <div className="wallp">
                    <img src="/images/cover.jpeg" alt="Cover" className="coverimg" />
                    <div className="nice top">COCONUT'S JOURNAL</div>
                </div>
            </div>
            <div className="imptext sta">
                <div>*Press Fn+F11 for fullscreen*</div>
                <div>*Click anywhere on the Cover to open*</div>
                <div>*Use Arrow keys to navigate in between pages*</div>    
            </div>
        </div>
    )
}