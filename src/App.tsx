import {useCallback, useState} from 'react'
import './App.css'

function App() {
    const colors = ["red", "blue", "green", "yellow"];

    const [sequence, setSequence] = useState(new Array(50));
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const handleClick = useCallback((color) => {
        if (isPlayerTurn) {
            if (currentIndex != -1) {
                const currentColor = sequence[currentIndex]
                if (currentColor) {
                    if (currentColor === color) {
                        console.log("Correct color clicked");
                        if (currentIndex < sequence.length - 1) {
                            setCurrentIndex(currentIndex + 1);
                        } else {
                            setIsPlayerTurn(false);
                            // Need to add a new color here
                            const newSequence = [...sequence];
                            const randomColor = getRandomColor();
                            newSequence.push(randomColor);
                            console.log("Added color", randomColor)
                            setSequence(newSequence)
                            setCurrentIndex(0);
                            setIsPlayerTurn(true);
                        }
                    } else {
                        //Mauvaise couleur cliquée
                        setCurrentIndex(-1);
                        setIsPlayerTurn(false);
                        console.log("Game lost\nYou clicked on", color, "but", currentColor, "was expected.");
                        alert("Game lost\nYou clicked on " + color + " but " + currentColor + " was expected.");
                    }
                } else {
                    // Dépassement de l'array
                }
            } else {
                // La partie n'est pas initialisée ou perdue
                //console.log("Game not started or lost\nYou clicked on", color);
                setIsPlayerTurn(false);

                // INIT FORCE - DELETE LATER
                setSequence(["red"]);
                setCurrentIndex(0);
                setIsPlayerTurn(true);
                console.log("GAME INIT : YOUR TURN")
            }
        } else {
            // Ce n'est pas au joueur de jouer
            console.log("Not your turn\nYou clicked on", color);
            //TEMPORAIRE - TO DELETE
            setIsPlayerTurn(!isPlayerTurn);
            ////////////////////////
        }
    }, [isPlayerTurn, currentIndex, sequence]);

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

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
