import Image from "next/image";

import GameStatusBar from "@/components/molecules/GameStatusBar";
import ControlPanel from "@/components/organisms/ControlPanel";
import usePlayer from "@/hooks/usePlayer";

import { Container, PlayerInfoBox, PlayerName, Score } from "@/styles/play.styles";

export default function PlayGame() {
  const player = usePlayer();

  return (
    <Container>
      <PlayerInfoBox>
        <Image src="/assets/images/star.svg" alt="star" width={17} height={17} />
        <PlayerName>{player.headTag}</PlayerName>
        <Score>{player.thisRoundScore || 0}</Score>
      </PlayerInfoBox>
      <ControlPanel />
      <GameStatusBar />
    </Container>
  );
}
