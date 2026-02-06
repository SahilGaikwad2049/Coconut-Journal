export function End({onClose}) {
    return(
        <div>
            <div className="wallp" onClick={onClose}>
               <img src="/images/end.jpeg" alt="" className="coverimg"/>
               <div className="ends">ENDS</div>
            </div>
            <div className="imptext sta">*Click anywhere on the End Cover to go back*</div>
        </div>
    )
}