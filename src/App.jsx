import { useState } from 'react';
import MapPopup from './components/MapPopup';
import JapanMap from './components/JapanMap';
import { prefectures } from './data/prefectures';
import './App.css';

function App() {
  const [selectedPrefecture, setSelectedPrefecture] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const [mode, setMode] = useState('learn'); // 'learn' or 'quiz'
  const [quizTarget, setQuizTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const handlePrefectureClick = (prefectureCode, position) => {
    const prefecture = prefectures.find(p => p.code === parseInt(prefectureCode));

    if (mode === 'learn') {
      // Toggle selection if clicking the same prefecture
      if (selectedPrefecture && selectedPrefecture.code === prefecture.code) {
        setSelectedPrefecture(null);
        setPopupPosition(null);
      } else {
        setSelectedPrefecture(prefecture);
        setPopupPosition(position);
      }
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
        setTimeout(() => {
          setMessage('');
        }, 1500);
      }
    }
  };

  const startQuiz = () => {
    const randomPrefecture = prefectures[Math.floor(Math.random() * prefectures.length)];
    setQuizTarget(randomPrefecture);
    setSelectedPrefecture(null);
    setPopupPosition(null);
    setMessage('');
  };

  const toggleMode = () => {
    const newMode = mode === 'learn' ? 'quiz' : 'learn';
    setMode(newMode);
    setSelectedPrefecture(null);
    setPopupPosition(null);
    if (newMode === 'quiz') {
      setScore(0);
      startQuiz();
    } else {
      setQuizTarget(null);
      setMessage('');
    }
  };

  const handlePopupClose = () => {
    setSelectedPrefecture(null);
    setPopupPosition(null);
  }

  return (
    <div id="app-container">
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 className="title">일본 도도부현 명칭</h1>
        </div>
        <div className="header-controls" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className={`mode-switch ${mode}`} onClick={toggleMode}>
            <div className="mode-switch-slider"></div>
            <div className={`mode-switch-item ${mode === 'learn' ? 'active' : ''}`}>학습 모드</div>
            <div className={`mode-switch-item ${mode === 'quiz' ? 'active' : ''}`}>퀴즈 모드</div>
          </div>
        </div>
      </header>

      <main>
        <JapanMap
          onPrefectureClick={handlePrefectureClick}
          activePrefectureCode={selectedPrefecture?.code}
          quizTargetCode={quizTarget?.code}
          mode={mode}
          onInteractionStart={handlePopupClose}
        />

        {mode === 'quiz' && (
          <div className="glass-panel quiz-info-panel map-overlay-top" style={{ padding: '0.6rem 1.5rem', display: 'flex', gap: '2rem', alignItems: 'center', border: '1px solid var(--color-success)', zIndex: 50 }}>
            <span style={{ fontSize: '1rem' }}>점수: <strong style={{ color: 'var(--color-success)', fontSize: '1.2rem' }}>{score}</strong></span>
            {quizTarget && <span style={{ fontSize: '1rem' }}>찾을 지역: <strong style={{ color: 'var(--color-accent)', fontSize: '1.2rem' }}>{quizTarget.name_ko}</strong></span>}
          </div>
        )}

        {message && (
          <div className="glass-panel quiz-result-message" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '1.5rem 3rem',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: message.includes('정답') ? 'var(--color-success)' : 'var(--color-error)',
            zIndex: 150,
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: `2px solid ${message.includes('정답') ? 'var(--color-success)' : 'var(--color-error)'}`
          }}>
            {message}
          </div>
        )}

        {/* 학습 모드 팝업 */}
        <MapPopup
          prefecture={selectedPrefecture}
          position={popupPosition}
          onClose={handlePopupClose}
        />

        {/* 학습 모드 안내 (선택된 것 없을 때) */}
        {mode === 'learn' && !selectedPrefecture && (
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem',
            pointerEvents: 'none',
            zIndex: 10
          }}>
            지도의 지역을 클릭하여 상세 정보를 확인하세요
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
