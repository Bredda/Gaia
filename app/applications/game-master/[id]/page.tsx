"use client";

import { useGameMaster } from "../game.provider";

function GamePage() {
  const { currentGame } = useGameMaster();

  return (
    <div>
      <h1>{currentGame && <span>{currentGame.world_name}</span>}</h1>
    </div>
  );
}

export default GamePage;
