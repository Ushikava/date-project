import { useState, useCallback, useRef } from 'react'

import './App.css'

import mainGif from './assets/cat_3_loop.gif'

function App() {
  const noBtnRef = useRef(null)
  const [noTranslate, setNoTranslate] = useState({ x: 0, y: 0 })
  const [answered, setAnswered] = useState(false)

  const runAway = useCallback(() => {
    if (!noBtnRef.current) return
    const rect = noBtnRef.current.getBoundingClientRect()
    const margin = 20
    const targetX = margin + Math.random() * (window.innerWidth - rect.width - margin * 2)
    const targetY = margin + Math.random() * (window.innerHeight - rect.height - margin * 2)

    setNoTranslate(prev => ({
      x: prev.x + (targetX - rect.left),
      y: prev.y + (targetY - rect.top),
    }))
  }, [])

  if (answered) {
    return (
      <div className="app">
        <button className="back-btn" onClick={() => setAnswered(false)} aria-label="Назад">
          ←
        </button>
        <img src={mainGif} alt="Cat" />
        <p className="text">Легко 😎</p>
      </div>
    )
  }

  return (
    <div className="app">
          <img src={mainGif} alt="Cat" />
      <p className="question">Пойдёшь со мной на свидание?</p>
      <div className="buttons">
        <button className="btn btn-yes" onClick={() => setAnswered(true)}>
          Да
        </button>
        <button
          ref={noBtnRef}
          className="btn btn-no"
          style={{
            transform: `translate(${noTranslate.x}px, ${noTranslate.y}px)`,
            transition: 'transform 0.45s ease',
          }}
          onMouseEnter={runAway}
          onTouchStart={runAway}
        >
          Нет
        </button>
      </div>
    </div>
  )
}

export default App
