import { useState } from 'react'
import './App.css'

function App() {
  const [sequence, setSequence] = useState(new Array(50));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  return (
    <>
      <div className="playField">
          <div className="red hoverable"></div>
          <div className="blue hoverable"></div>
          <div className="green hoverable"></div>
          <div className="yellow hoverable"></div>
      </div>
    </>
  )
}

export default App
