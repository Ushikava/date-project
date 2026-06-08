import { useState, useCallback, useRef, useMemo } from 'react'
import './App.css'

import page1Gif from './assets/cat_1_loop.gif'
import page2Gif from './assets/cat_2_loop.gif'
import page3Gif from './assets/cat_3_loop.gif'
import page4Gif from './assets/cat_4_loop.gif'
import page5Gif from './assets/cat_5_loop.gif'
import page6Gif from './assets/cat_6_loop.gif'


const EMOJIS = ['🎉', '🎊', '💕', '✨', '🌸', '💖', '🥳', '🌟', '❤️', '🎈', '🫶', '💝', '🌺', '🎀', '💫', '🩷', '🦋', '🌈', '💗', '🍀']

function Confetti() {
  const particles = useMemo(() => {
    // снизу вверх
    const bottom = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      type: 'bottom',
      emoji: EMOJIS[i % EMOJIS.length],
      style: {
        left: `${3 + Math.random() * 94}%`,
        bottom: '-40px',
        fontSize: `${16 + Math.floor(Math.random() * 20)}px`,
        animationDuration: `${2.5 + Math.random() * 2.5}s`,
        animationDelay: `${-(Math.random() * 5)}s`,
        '--dx': `${(Math.random() - 0.5) * 120}px`,
        '--dy': '-105vh',
      },
    }))

    // слева направо + вниз
    const left = Array.from({ length: 16 }, (_, i) => ({
      id: 28 + i,
      type: 'side',
      emoji: EMOJIS[(i + 3) % EMOJIS.length],
      style: {
        left: '-40px',
        top: `${5 + Math.random() * 55}%`,
        fontSize: `${18 + Math.floor(Math.random() * 16)}px`,
        animationDuration: `${1.8 + Math.random() * 1.8}s`,
        animationDelay: `${-(Math.random() * 4)}s`,
        '--dx': `${160 + Math.random() * 220}px`,
        '--dy': `${80 + Math.random() * 280}px`,
      },
    }))

    // справа налево + вниз
    const right = Array.from({ length: 16 }, (_, i) => ({
      id: 44 + i,
      type: 'side',
      emoji: EMOJIS[(i + 6) % EMOJIS.length],
      style: {
        right: '-40px',
        top: `${5 + Math.random() * 55}%`,
        fontSize: `${18 + Math.floor(Math.random() * 16)}px`,
        animationDuration: `${1.8 + Math.random() * 1.8}s`,
        animationDelay: `${-(Math.random() * 4)}s`,
        '--dx': `${-(160 + Math.random() * 220)}px`,
        '--dy': `${80 + Math.random() * 280}px`,
      },
    }))

    return [...bottom, ...left, ...right]
  }, [])

  return (
    <div className="confetti-wrap" aria-hidden="true">
      {particles.map(p => (
        <span key={p.id} className={`confetti-piece confetti-${p.type}`} style={p.style}>
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function BackButton({ onClick }) {
  return (
    <button className="back-btn" onClick={onClick} aria-label="Назад">←</button>
  )
}

function Page1({ onNext }) {
  return (
    <div className="app">
      <img src={page1Gif} alt="Cat" />
      <p className="question">У меня есть к тебе серьёзный разговор</p>
      <button className="btn btn-yes" onClick={onNext}>
        Какой? 👀
      </button>
    </div>
  )
}

function Page2({ onBack, onNext }) {
  return (
    <div className="app">
      <BackButton onClick={onBack} />
      <img src={page2Gif} alt="Cat" />
      <p className="question">Отнесись к этому максимально серьёзно!</p>
      <button className="btn btn-yes" onClick={onNext}>
        Клянусь! 😤
      </button>
    </div>
  )
}

function Page3({ onBack, onNext }) {
  return (
    <div className="app">
      <BackButton onClick={onBack} />
      <img src={page3Gif} alt="Cat" />
      <p className="question">Когда я вернусь домой, ты...</p>
      <button className="btn btn-yes" onClick={onNext}>
        То я?! 😳
      </button>
    </div>
  )
}

function Page4({ onBack, onYes }) {
  const noBtnRef = useRef(null)
  const [noTranslate, setNoTranslate] = useState({ x: 0, y: 0 })

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

  return (
    <div className="app">
      <BackButton onClick={onBack} />
      <img src={page4Gif} alt="Cat" />
      <p className="question">Пойдёшь со мной в ГВ 3?</p>
      <div className="buttons">
        <button className="btn btn-yes" onClick={onYes}>
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

function Page5({ onBack, onNext }) {
  return (
    <div className="app">
      <Confetti />
      <BackButton onClick={onBack} />
      <img src={page5Gif} alt="Cat" />
      <p className="text">EeeeeeeeEEEEEEeeEeeEeee!!1!11!!!!!!11</p>
      <button className="btn btn-yes" onClick={onNext}>
        ЕЕЕЕЕ!
      </button>
    </div>
  )
}

function Page6({ onBack }) {
  return (
    <div className="app">
      <BackButton onClick={onBack} />
      <img src={page6Gif} alt="Cat" />
      <p className="text">скучаю</p>
    </div>
  )
}

function App() {
  const [page, setPage] = useState(0)

  if (page === 0) return <Page1 onNext={() => setPage(1)} />
  if (page === 1) return <Page2 onBack={() => setPage(0)} onNext={() => setPage(2)} />
  if (page === 2) return <Page3 onBack={() => setPage(1)} onNext={() => setPage(3)} />
  if (page === 3) return <Page4 onBack={() => setPage(2)} onYes={() => setPage(4)} />
  if (page === 4) return <Page5 onBack={() => setPage(3)} onNext={() => setPage(5)} />
  if (page === 5) return <Page6 onBack={() => setPage(4)} />
}

export default App
