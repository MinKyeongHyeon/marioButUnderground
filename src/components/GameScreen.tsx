import React, { useEffect, useState } from 'react';
import { Player } from './Player';
import { Platform } from './Platform';
import type { GameState } from '../types/game';
import '../styles/GameScreen.scss';

interface GameScreenProps {
  gameState: GameState;
  onStartGame: () => void;
  onStopGame: () => void;
  onResetGame: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  onStartGame,
  onStopGame,
  onResetGame,
}) => {
  const { player, platforms, camera, isGameRunning, score } = gameState;
  const [showFallMessage, setShowFallMessage] = useState(false);
  const [previousScore, setPreviousScore] = useState(0);

  // 플레이어가 떨어졌을 때 메시지 표시
  useEffect(() => {
    if (!isGameRunning && score === 0 && previousScore > 0) {
      setShowFallMessage(true);
      const timer = setTimeout(() => setShowFallMessage(false), 3000);
      return () => clearTimeout(timer);
    }
    if (isGameRunning) {
      setPreviousScore(score);
    }
  }, [isGameRunning, score, previousScore]);

  const handleStartGame = () => {
    setShowFallMessage(false);
    onStartGame();
  };

  return (
    <div className="game-screen">
      <div className="game-ui">
        <div className="score-section">
          <div className="score">점수: {score}</div>
          {previousScore > 0 && !isGameRunning && (
            <div className="best-score">최고 점수: {Math.max(score, previousScore)}</div>
          )}
        </div>
        
        <div className="controls">
          {!isGameRunning ? (
            <>
              <button onClick={handleStartGame} className="start-btn">
                {score === 0 && previousScore === 0 ? '게임 시작' : '다시 시작'}
              </button>
              <button onClick={onResetGame} className="reset-btn">
                초기화
              </button>
            </>
          ) : (
            <button onClick={onStopGame} className="stop-btn">
              일시정지
            </button>
          )}
        </div>
        
        <div className="instructions">
          {!isGameRunning ? (
            <span>🎮 WASD 또는 화살표 키로 이동 및 점프!</span>
          ) : (
            <span>🏃‍♂️ 플랫폼을 점프하며 최대한 멀리 가세요!</span>
          )}
        </div>
      </div>

      {/* 떨어졌을 때 메시지 */}
      {showFallMessage && (
        <div className="fall-message">
          <div className="fall-content">
            <h2>💀 게임 오버!</h2>
            <p>점수: {previousScore}점</p>
            <p>다시 도전해보세요!</p>
          </div>
        </div>
      )}

      {/* 게임이 시작되지 않았을 때 안내 메시지 */}
      {!isGameRunning && !showFallMessage && (
        <div className="start-overlay">
          <div className="start-content">
            <h2>🍄 Mario But Underground</h2>
            <p>브라우저 하단에서 즐기는 플랫폼 게임!</p>
            <div className="game-tips">
              <h3>게임 방법:</h3>
              <ul>
                <li>🏃‍♂️ A/D 또는 ←/→ : 좌우 이동</li>
                <li>🦘 W/스페이스/↑ : 점프</li>
                <li>🎯 목표: 플랫폼을 넘나들며 최대한 멀리!</li>
                <li>⚠️ 주의: 떨어지면 게임 오버!</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="game-viewport">
        <div className="game-world">
          {/* 배경 */}
          <div className="background" style={{ transform: `translateX(${-camera.x * 0.3}px)` }}>
            <div className="clouds">☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️</div>
          </div>
          
          {/* 플랫폼들 */}
          {platforms.map((platform, index) => (
            <Platform
              key={index}
              platform={platform}
              cameraX={camera.x}
            />
          ))}
          
          {/* 플레이어 */}
          <Player player={player} cameraX={camera.x} />
          
          {/* 점수 표시기 (게임 중일 때만) */}
          {isGameRunning && (
            <div 
              className="score-indicator" 
              style={{ 
                left: `${player.position.x - camera.x}px`,
                top: `${player.position.y - 30}px` 
              }}
            >
              {score}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
