export interface Position {
  x: number;
  y: number;
}

export interface Player {
  position: Position;
  velocity: Position;
  isJumping: boolean;
  isGrounded: boolean;
  width: number;
  height: number;
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameState {
  player: Player;
  platforms: Platform[];
  camera: Position;
  isGameRunning: boolean;
  score: number;
}

export interface Controls {
  left: boolean;
  right: boolean;
  jump: boolean;
}
