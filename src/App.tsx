import {useCallback, useState} from 'react'
import './App.css'

function App() {
    const [sequence, setSequence] = useState(new Array(50));
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const handleClick = useCallback((color) => {
        if (isPlayerTurn) {
            console.log(color);
            setIsPlayerTurn(!isPlayerTurn)
        } else {
            console.log(color);
            setIsPlayerTurn(!isPlayerTurn)
        }
    }, [isPlayerTurn]);

    return (
        <>
            <div className="playField">
                <div id="red" className="red hoverable" onClick={() => handleClick("red")}></div>
                <div id="blue" className="blue hoverable" onClick={() => handleClick("blue")}></div>
                <div id="green" className="green hoverable" onClick={() => handleClick("green")}></div>
                <div id="yellow" className="yellow hoverable" onClick={() => handleClick("yellow")}></div>
            </div>
        </>
    )
}

export default App
