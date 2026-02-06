import { useState } from 'react';
import InfoCard from './components/InfoCard';
import JapanMap from './components/JapanMap';
import { prefectures } from './data/prefectures';
import './App.css';

function App() {
  const [selectedPrefecture, setSelectedPrefecture] = useState(null);
  const [mode, setMode] = useState('learn'); // 'learn' or 'quiz'
  const [quizTarget, setQuizTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const handlePrefectureClick = (prefectureCode) => {
    const prefecture = prefectures.find(p => p.code === parseInt(prefectureCode));

    if (mode === 'learn') {
      setSelectedPrefecture(prefecture);
    } else if (mode === 'quiz' && quizTarget) {
      if (prefecture.code === quizTarget.code) {
        setScore(prev => prev + 1);
        setMessage('정답입니다! 🎉');
        setTimeout(() => {
          setMessage('');
          startQuiz();
        }, 1500);
      } else {
        setMessage('틀렸습니다. 다시 시도해보세요.');
      }
    }
  };

  const startQuiz = () => {
    const randomPrefecture = prefectures[Math.floor(Math.random() * prefectures.length)];
    setQuizTarget(randomPrefecture);
    setSelectedPrefecture(null);
    setMessage('');
  };

  const toggleMode = () => {
    const newMode = mode === 'learn' ? 'quiz' : 'learn';
    setMode(newMode);
    setSelectedPrefecture(null);
    if (newMode === 'quiz') {
      setScore(0);
      startQuiz();
    } else {
      setQuizTarget(null);
      setMessage('');
    }
  };

  return (
    <div id="app-container">
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 className="title">일본 도도부현 지명 학습</h1>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {mode === 'quiz' && (
            <div className="glass-panel" style={{ padding: '0.4rem 1.2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', border: '1px solid var(--color-success)' }}>
              <span style={{ fontSize: '0.9rem' }}>SCORE: <strong style={{ color: 'var(--color-success)', fontSize: '1.1rem' }}>{score}</strong></span>
              {quizTarget && <span style={{ fontSize: '0.9rem' }}>TARGET: <strong style={{ color: 'var(--color-accent)', fontSize: '1.1rem' }}>{quizTarget.name_ko}</strong></span>}
            </div>
          )}

          <div className={`mode-switch ${mode}`} onClick={toggleMode}>
            <div className="mode-switch-slider"></div>
            <div className={`mode-switch-item ${mode === 'learn' ? 'active' : ''}`}>학습 모드</div>
            <div className={`mode-switch-item ${mode === 'quiz' ? 'active' : ''}`}>퀴즈 모드</div>
          </div>
        </div>
      </header>

      <main>
        <div style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          position: 'relative'
        }}>
          <JapanMap
            onPrefectureClick={handlePrefectureClick}
            activePrefectureCode={selectedPrefecture?.code}
            quizTargetCode={quizTarget?.code}
            mode={mode}
          />

          {message && (
            <div className="glass-panel" style={{
              position: 'absolute',
              top: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '0.8rem 1.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: message.includes('정답') ? 'var(--color-success)' : 'var(--color-error)',
              zIndex: 100,
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
            }}>
              {message}
            </div>
          )}
        </div>

        <aside style={{
          width: '380px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
          backgroundColor: 'rgba(15, 23, 42, 0.3)'
        }}>
          <InfoCard
            selectedPrefecture={selectedPrefecture}
            mode={mode}
            onClose={() => setSelectedPrefecture(null)}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
