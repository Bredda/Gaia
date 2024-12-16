"use client";

import { useSafeContext } from "@/lib/utils";
import { createContext, useEffect, useState } from "react";
import { Game } from "./types";
import { fetchGames, insertGame, removeGame, updateGame } from "./game.crud";

interface GameMasterState {
  games: Game[];
  addGame: (game: Game) => void;
  loadGame: (gameId: string) => void;
  deleteGame: (gameId: string) => void;
  saveGame: (game: Partial<Game> & { id: string }) => void;
  loading: boolean;
  deleting: boolean;
  saving: boolean;
  currentGame: Game | null;
}

const GameMasterContext = createContext<GameMasterState | undefined>(undefined);

export const useGameMaster = () => useSafeContext(GameMasterContext);

export function GameMasterProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const data = await fetchGames();
        console.log(data);
        setGames(data);
      } catch (error) {
        alert("Error fetching games!");
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const loadGame = (gameId: string) => {
    setLoading(true);
    const game = games.find((g) => g.id === gameId);
    if (game) {
      setCurrentGame(game);
    }
    setLoading(false);
  };

  const addGame = async (game: Partial<Game>) => {
    setSaving(true);

    try {
      const data = await insertGame(game);
      setGames((prev) => [...prev, data]);
    } catch (error) {
      alert("Error saving game!");
    } finally {
      setLoading(false);
    }
  };

  const deleteGame = async (gameId: string) => {
    setDeleting(true);
    try {
      const data = await removeGame(gameId);
      setGames((prev) => [...prev.filter((g) => g.id !== data)]);
    } catch (error) {
      alert("Error deleting game!");
    } finally {
      setLoading(false);
    }
    setDeleting(false);
  };

  const saveGame = async (game: Partial<Game> & { id: string }) => {
    setSaving(true);
    try {
      const data = await updateGame(game);
      setGames((prev) => prev.map((g) => (g.id === game.id ? data : g)));
    } catch (error) {
      alert("Error deleting game!");
    } finally {
      setLoading(false);
    }
    setSaving(false);
  };

  const value = {
    loading,
    deleting,
    saving,
    currentGame,
    games,
    addGame,
    deleteGame,
    saveGame,
    loadGame,
  };

  return (
    <GameMasterContext.Provider value={value}>
      {children}
    </GameMasterContext.Provider>
  );
}
