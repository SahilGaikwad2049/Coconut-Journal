export function Page({side, children, onClick}) {
    return (
        <>
            <div className={`page ${side}`} onClick={onClick}>
                <div className="content">
                    {children}
                </div>
            </div>
        </>
    )
}