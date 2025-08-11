import React from 'react';
import type { Platform as PlatformType } from '../types/game';
import '../styles/Platform.scss';

interface PlatformProps {
  platform: PlatformType;
  cameraX: number;
}

export const Platform: React.FC<PlatformProps> = ({ platform, cameraX }) => {
  const style = {
    left: `${platform.x - cameraX}px`,
    top: `${platform.y}px`,
    width: `${platform.width}px`,
    height: `${platform.height}px`,
  };

  return <div className="platform" style={style}></div>;
};
