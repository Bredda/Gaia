import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GameLoader from "./game-loader";
import { GameMasterProvider } from "./game.provider";
import Link from "next/link";

export default function GameMasterPage() {
  return (
    <div className="flex space-x-4 items-center justify-center h-full">
      <Link href="/applications/game-master/new">
        <Card className="hover:bg-primary hover:text-primary-foreground  cursor-pointer ">
          <CardHeader>New game</CardHeader>
        </Card>
      </Link>
      <GameLoader>
        <Card className="hover:bg-primary hover:text-primary-foreground  cursor-pointer ">
          <CardHeader>Load game</CardHeader>
        </Card>
      </GameLoader>
    </div>
  );
}
