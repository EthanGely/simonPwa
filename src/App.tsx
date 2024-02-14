import {useCallback, useEffect, useState} from 'react'
import './App.css'

const colors = ["red", "blue", "green", "yellow"];

function getRandomColor() : String {
    return colors[Math.floor(Math.random() * colors.length)];
}

function factorial(num: number) : number
{
    let rval=1;
    for (let i = 2; i <= num; i++)
        rval = rval + i;
    return rval;
}

function App() {
    const [sequence, setSequence] = useState<String[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [isPlayerTurn, setIsPlayerTurn] = useState<Boolean>(false);

    useEffect(() => {
        if (!isPlayerTurn) {
            const randomColor : String = getRandomColor();
            let newSequence : String[] = [];

            if (currentIndex === -1) {
                newSequence.push(randomColor);

                const timeout = setTimeout(() => {
                    setSequence(newSequence)
                    setCurrentIndex(currentIndex + 1);
                }, 1200);
                return () => clearTimeout(timeout);

            } else {
                if (currentIndex === sequence.length) {
                    // Player has got all colors. Need to add new color then show all from beginning.
                    newSequence = [...sequence];
                    newSequence.push(randomColor);
                    const timeout = setTimeout(() => {
                        setSequence(newSequence)
                        setCurrentIndex(0);
                    }, 1200);
                    return () => clearTimeout(timeout);
                } else if (currentIndex >= sequence.length - 1) {
                    // All colors shown, player's turn
                    const timeout = setTimeout(() => {
                        setIsPlayerTurn(true);
                        setCurrentIndex(0);
                    }, 1200);
                    return () => clearTimeout(timeout);
                } else {
                    // Showing colors
                    const timeout = setTimeout(() => {
                        setCurrentIndex(currentIndex + 1);
                    }, 1200);
                    return () => clearTimeout(timeout);
                }
            }
        } else {
            const timeout = setTimeout(() => {
            }, 1200);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, sequence])

    const handleClick = useCallback((color : String) => {
        if (isPlayerTurn) {
            if (currentIndex != -1) {
                const currentColor = sequence[currentIndex]
                if (currentColor) {
                    if (currentColor === color) {
                        console.log("Correct color clicked");
                        setCurrentIndex(currentIndex + 1);
                        if (currentIndex === sequence.length - 1) {
                            setIsPlayerTurn(false);
                        }
                    } else {
                        let score = factorial(sequence.length - 1) + currentIndex + 1;
                        // wrong color clicked
                        console.log("Game lost\nYou clicked on", color, "but", currentColor, "was expected.\nYour score :", score, "points.");
                        alert("Game lost\nYou clicked on " + color + " but " + currentColor + " was expected.\nYour score " + score + " points.");
                        setIsPlayerTurn(false);
                        setCurrentIndex(-1);
                    }
                } else {
                    // Dépassement de l'array
                    console.error("This bug is the graphic designer's fault.\nSigned by the perfect dev.")
                }
            } else {
                // La partie n'est pas initialisée ou perdue
                console.log("Game not started or lost");
                setIsPlayerTurn(false);
            }
        } else {
            // Ce n'est pas au joueur de jouer
            console.log("Not your turn");
        }
    }, [isPlayerTurn, currentIndex, sequence]);

    return (
        <>
            <h1>Simon game</h1>
            <div className="playField">
                {colors.map((color, i) => {
                    let className = ''
                    if(isPlayerTurn){
                        className = 'hoverable'
                    }
                    else if(color === sequence[currentIndex]) {
                        className = 'hovered'
                    }

                    return <div
                        key={i}
                        id={color}
                        className={className}
                        onClick={() => handleClick(color)}
                    />
                })}
            </div>
        </>
    )
}

export default App
