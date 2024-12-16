import { GameMasterProvider } from "./game.provider";

export default async function GameMasterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GameMasterProvider>{children}</GameMasterProvider>;
}
