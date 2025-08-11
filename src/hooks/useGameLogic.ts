import { useState, useEffect, useCallback } from 'react';
import type { GameState, Controls, Player, Platform } from '../types/game';

const GRAVITY = 0.5; // 중력 감소
const JUMP_FORCE = -12; // 점프력 조정
const MOVE_SPEED = 3; // 이동속도 감소
const GROUND_Y = 200; // 지면 높이 (화면 1/3 기준으로 조정)
const GAME_HEIGHT = window.innerHeight / 3; // 게임 영역 높이

const initialPlayer: Player = {
  position: { x: 100, y: GROUND_Y - 40 },
  velocity: { x: 0, y: 0 },
  isJumping: false,
  isGrounded: true,
  width: 40,
  height: 40,
};

const initialPlatforms: Platform[] = [
  // 기본 지면
  { x: 0, y: GROUND_Y, width: 3000, height: 20 },
  // 플랫폼들 - 더 합리적인 배치
  { x: 300, y: GROUND_Y - 60, width: 120, height: 15 },
  { x: 500, y: GROUND_Y - 100, width: 100, height: 15 },
  { x: 750, y: GROUND_Y - 50, width: 150, height: 15 },
  { x: 1000, y: GROUND_Y - 120, width: 100, height: 15 },
  { x: 1250, y: GROUND_Y - 80, width: 120, height: 15 },
  { x: 1500, y: GROUND_Y - 140, width: 100, height: 15 },
  { x: 1750, y: GROUND_Y - 70, width: 130, height: 15 },
];

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: initialPlayer,
    platforms: initialPlatforms,
    camera: { x: 0, y: 0 },
    isGameRunning: false,
    score: 0,
  });

  const [controls, setControls] = useState<Controls>({
    left: false,
    right: false,
    jump: false,
  });

  // 브라우저 창 크기 조절 함수
  const resizeBrowserWindow = useCallback(() => {
    try {
      const screenWidth = window.screen.availWidth;
      const screenHeight = window.screen.availHeight;
      
      // 창 크기를 100% 너비 × 1/3 높이로 설정
      const newWidth = screenWidth;
      const newHeight = Math.floor(screenHeight / 3);
      
      // 창을 화면 하단에 위치시킴
      const newX = 0;
      const newY = screenHeight - newHeight;
      
      // 창 크기와 위치 조절
      window.resizeTo(newWidth, newHeight);
      window.moveTo(newX, newY);
    } catch (error) {
      console.warn('브라우저 창 크기 조절에 실패했습니다:', error);
    }
  }, []);

  // 키보드 이벤트 처리
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!gameState.isGameRunning) return;
    
    switch (event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        setControls(prev => ({ ...prev, left: true }));
        break;
      case 'ArrowRight':
      case 'KeyD':
        setControls(prev => ({ ...prev, right: true }));
        break;
      case 'Space':
      case 'ArrowUp':
      case 'KeyW':
        event.preventDefault();
        setControls(prev => ({ ...prev, jump: true }));
        break;
    }
  }, [gameState.isGameRunning]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        setControls(prev => ({ ...prev, left: false }));
        break;
      case 'ArrowRight':
      case 'KeyD':
        setControls(prev => ({ ...prev, right: false }));
        break;
      case 'Space':
      case 'ArrowUp':
      case 'KeyW':
        setControls(prev => ({ ...prev, jump: false }));
        break;
    }
  }, []);

  // 충돌 감지
  const checkCollision = (player: Player, platform: Platform): boolean => {
    return (
      player.position.x < platform.x + platform.width &&
      player.position.x + player.width > platform.x &&
      player.position.y < platform.y + platform.height &&
      player.position.y + player.height > platform.y
    );
  };

  // 플레이어가 떨어졌는지 확인
  const checkPlayerFell = (player: Player): boolean => {
    return player.position.y > GAME_HEIGHT + 50; // 게임 영역 아래로 떨어짐
  };

  // 점수 계산 (이동 거리 기반)
  const calculateScore = (playerX: number): number => {
    return Math.floor(Math.max(0, playerX - 100) / 10);
  };

  // 게임 업데이트 로직
  const updateGame = useCallback(() => {
    if (!gameState.isGameRunning) return;

    setGameState(prevState => {
      const newPlayer = { ...prevState.player };
      
      // 수평 이동 (가속도 적용)
      if (controls.left) {
        newPlayer.velocity.x = Math.max(newPlayer.velocity.x - 0.5, -MOVE_SPEED);
      } else if (controls.right) {
        newPlayer.velocity.x = Math.min(newPlayer.velocity.x + 0.5, MOVE_SPEED);
      } else {
        // 마찰력 적용
        newPlayer.velocity.x *= 0.8;
        if (Math.abs(newPlayer.velocity.x) < 0.1) {
          newPlayer.velocity.x = 0;
        }
      }

      // 점프 (연속 점프 방지)
      if (controls.jump && newPlayer.isGrounded && !newPlayer.isJumping) {
        newPlayer.velocity.y = JUMP_FORCE;
        newPlayer.isJumping = true;
        newPlayer.isGrounded = false;
      }

      // 중력 적용
      newPlayer.velocity.y += GRAVITY;
      
      // 최대 낙하 속도 제한
      newPlayer.velocity.y = Math.min(newPlayer.velocity.y, 15);

      // 위치 업데이트
      newPlayer.position.x += newPlayer.velocity.x;
      newPlayer.position.y += newPlayer.velocity.y;

      // 플랫폼과의 충돌 검사
      newPlayer.isGrounded = false;
      
      for (const platform of prevState.platforms) {
        if (checkCollision(newPlayer, platform)) {
          // 위에서 떨어지는 경우 (발판 위에 착지)
          if (newPlayer.velocity.y > 0 && 
              newPlayer.position.y + newPlayer.height - newPlayer.velocity.y <= platform.y) {
            newPlayer.position.y = platform.y - newPlayer.height;
            newPlayer.velocity.y = 0;
            newPlayer.isGrounded = true;
            newPlayer.isJumping = false;
          }
          // 옆에서 충돌하는 경우
          else if (newPlayer.velocity.x !== 0) {
            if (newPlayer.position.x < platform.x) {
              newPlayer.position.x = platform.x - newPlayer.width;
            } else {
              newPlayer.position.x = platform.x + platform.width;
            }
            newPlayer.velocity.x = 0;
          }
        }
      }

      // 화면 왼쪽 경계 처리
      if (newPlayer.position.x < 0) {
        newPlayer.position.x = 0;
        newPlayer.velocity.x = 0;
      }

      // 플레이어가 떨어졌는지 확인
      if (checkPlayerFell(newPlayer)) {
        return {
          player: initialPlayer,
          platforms: initialPlatforms,
          camera: { x: 0, y: 0 },
          isGameRunning: false,
          score: 0,
        };
      }

      // 점수 업데이트
      const newScore = calculateScore(newPlayer.position.x);

      // 카메라 업데이트 (플레이어를 따라감)
      const newCamera = { ...prevState.camera };
      const targetCameraX = newPlayer.position.x - 300; // 플레이어를 화면 왼쪽에서 300px 지점에 위치
      newCamera.x = Math.max(0, targetCameraX);

      return {
        ...prevState,
        player: newPlayer,
        camera: newCamera,
        score: Math.max(prevState.score, newScore),
      };
    });
  }, [controls, gameState.isGameRunning]);

  // 게임 시작/정지
  const startGame = () => {
    setGameState(prev => ({ ...prev, isGameRunning: true }));
    resizeBrowserWindow(); // 게임 시작 시 창 크기 조절
  };

  const stopGame = () => {
    setGameState(prev => ({ ...prev, isGameRunning: false }));
  };

  const resetGame = () => {
    setGameState({
      player: initialPlayer,
      platforms: initialPlatforms,
      camera: { x: 0, y: 0 },
      isGameRunning: false,
      score: 0,
    });
    setControls({ left: false, right: false, jump: false });
  };

  // 게임 루프
  useEffect(() => {
    const gameLoop = setInterval(updateGame, 1000 / 60); // 60 FPS
    return () => clearInterval(gameLoop);
  }, [updateGame]);

  // 키보드 이벤트 리스너
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    gameState,
    startGame,
    stopGame,
    resetGame,
  };
};
