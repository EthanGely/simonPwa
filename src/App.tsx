import {useCallback, useEffect, useState} from 'react'
import './App.css'

const colors = ["red", "blue", "green", "yellow"];

let hasNotificationPermission = false;
if ("Notification" in window) {
    if (Notification.permission === "granted") {
        hasNotificationPermission = true;
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                hasNotificationPermission = true;
            }
        });
    }
}

function getRandomColor(): String {
    return colors[Math.floor(Math.random() * colors.length)];
}

function factorial(num: number): number {
    let rval = 1;
    for (let i = 2; i <= num; i++)
        rval = rval + i;
    return rval;
}

function App() {
    const [sequence, setSequence] = useState<String[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [isPlayerTurn, setIsPlayerTurn] = useState<Boolean>(false);
    const [dateCache, setDateCache] = useState<String>("");

    useEffect(() => {
        if (!isPlayerTurn) {
            const randomColor: String = getRandomColor();
            let newSequence: String[] = [];

            if (currentIndex === -1) {
                newSequence.push(randomColor);

                const timeout = setTimeout(() => {
                    setSequence(newSequence)
                    setCurrentIndex(currentIndex + 1);
                }, 800);
                return () => clearTimeout(timeout);

            } else {
                if (currentIndex === sequence.length) {
                    // Player has got all colors. Need to add new color then show all from beginning.
                    newSequence = [...sequence];
                    newSequence.push(randomColor);
                    const timeout = setTimeout(() => {
                        setSequence(newSequence)
                        setCurrentIndex(0);
                    }, 800);
                    return () => clearTimeout(timeout);
                } else if (currentIndex >= sequence.length - 1) {
                    // All colors shown, player's turn
                    const timeout = setTimeout(() => {
                        setIsPlayerTurn(true);
                        setCurrentIndex(0);
                    }, 800);
                    return () => clearTimeout(timeout);
                } else {
                    // Showing colors
                    navigator.vibrate(100);
                    const timeout = setTimeout(() => {
                        setCurrentIndex(currentIndex + 1);
                    }, 800);
                    return () => clearTimeout(timeout);
                }
            }
        } else {
            const timeout = setTimeout(() => {
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, sequence])

    const handleClick = useCallback((color: String) => {
        if (isPlayerTurn) {
            if (currentIndex != -1) {
                const currentColor = sequence[currentIndex]
                if (currentColor) {
                    if (currentColor === color) {
                        navigator.vibrate(100);
                        setCurrentIndex(currentIndex + 1);
                        if (currentIndex === sequence.length - 1) {
                            setIsPlayerTurn(false);
                        }
                    } else {
                        navigator.vibrate(350);
                        let score = factorial(sequence.length - 1) + currentIndex + 1;
                        // wrong color clicked
                        console.log("Game lost\nYou clicked on", color, "but", currentColor, "was expected.\nYour score :", score, "points.");
                        if (hasNotificationPermission) {
                            // @ts-ignore
                            //const notification = new Notification("Game lost\nYou clicked on " + color + " but " + currentColor + " was expected.\nYour score " + score + " points.");
                            const body = "You clicked on " + color + " but " + currentColor + " was expected.\nYour score " + score + " points."
                            // @ts-ignore
                            const notification = new Notification("Game lost", {body: body});
                        } else {
                            alert("Game lost\nYou clicked on " + color + " but " + currentColor + " was expected.\nYour score " + score + " points.");
                        }
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
        }
    }, [isPlayerTurn, currentIndex, sequence]);

    useEffect(() => {
        async function getDate() {
            const response = await fetch('http://localhost:3000');
            console.log(response)
            const date = await response.text();
            setDateCache(date);
        }
        getDate();
    }, [])

    return (
        <>
            <h1>Simon game</h1>
            <h2>Client date : {Date.now()}</h2>
            <h2>Server date : {dateCache}</h2>
            <div className="playField">
                {colors.map((color, i) => {
                    let className = ''
                    if (isPlayerTurn) {
                        className = 'hoverable'
                    } else if (color === sequence[currentIndex]) {
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
