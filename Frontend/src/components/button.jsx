export default function Button({ children, clickFunction, isActive }){
    return <button onClick={clickFunction} className={isActive ? 'mybutton-active' : 'mybutton'}>{children}</button>
}