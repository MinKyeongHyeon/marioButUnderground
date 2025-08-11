import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameScreen } from './components/GameScreen';
import { useGameLogic } from './hooks/useGameLogic';
import './App.css';

function App() {
  const { gameState, startGame, stopGame, resetGame } = useGameLogic();

  return (
    <Router basename="/marioButUnderground">
      <div className="App">
        <div className="main-content">
          <h1>Mario But Underground</h1>
          <p>웹 브라우저 하단에서 즐기는 마리오 스타일 플랫폼 게임!</p>
          <div className="game-info">
            <div className="browser-info">
              <h2>🖥️ 최적의 게임 경험을 위해</h2>
              <p>게임 시작 시 브라우저 창이 자동으로 화면 하단 1/3 크기로 조절됩니다.</p>
              <small>* 일부 브라우저에서는 보안상 창 크기 조절이 제한될 수 있습니다.</small>
            </div>
            
            <div className="game-controls">
              <h2>🎮 게임 조작법</h2>
              <div className="controls-grid">
                <div className="control-item">
                  <span className="key">A / ←</span>
                  <span className="action">왼쪽 이동</span>
                </div>
                <div className="control-item">
                  <span className="key">D / →</span>
                  <span className="action">오른쪽 이동</span>
                </div>
                <div className="control-item">
                  <span className="key">W / ↑ / Space</span>
                  <span className="action">점프</span>
                </div>
              </div>
            </div>
            
            <div className="game-objective">
              <h2>🎯 게임 목표</h2>
              <ul>
                <li>플랫폼을 점프하며 최대한 멀리 이동하세요!</li>
                <li>이동 거리에 따라 점수가 증가합니다</li>
                <li>떨어지지 않도록 주의하세요 - 게임 오버됩니다!</li>
                <li>더 부드러운 움직임과 현실적인 물리 엔진을 경험해보세요</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Routes>
          <Route 
            path="/" 
            element={
              <GameScreen
                gameState={gameState}
                onStartGame={startGame}
                onStopGame={stopGame}
                onResetGame={resetGame}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
