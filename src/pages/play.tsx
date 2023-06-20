import Image from "next/image";

import GameStatusBar from "@/components/molecules/GameStatusBar";
import ControlPanel from "@/components/organisms/ControlPanel";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";

import { Container, PlayerInfoBox, PlayerName, Score } from "@/styles/play.styles";

export default function PlayGame() {
  const { isGameInProgress } = useGameStatus();
  const player = usePlayer();

  return (
    <Container>
      <PlayerInfoBox>
        {isGameInProgress ? (
          <>
            <Image src="/assets/images/star.svg" alt="reward" width={17} height={17} />
            <PlayerName>{player.headTag || "ddsf"}</PlayerName>
            <Score>{player.score || 4560}</Score>
          </>
        ) : (
          <div>dfdf</div>
        )}
      </PlayerInfoBox>
      <ControlPanel />
      <GameStatusBar />
    </Container>
  );
}
