import React from 'react';
import type { Player as PlayerType } from '../types/game';
import '../styles/Player.scss';

interface PlayerProps {
  player: PlayerType;
  cameraX: number;
}

export const Player: React.FC<PlayerProps> = ({ player, cameraX }) => {
  const style = {
    left: `${player.position.x - cameraX}px`,
    top: `${player.position.y}px`,
    width: `${player.width}px`,
    height: `${player.height}px`,
  };

  return (
    <div className="player" style={style}>
      🍄
    </div>
  );
};
