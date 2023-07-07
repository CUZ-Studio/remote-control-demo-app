import Image from "next/image";
import { isMobile } from "react-device-detect";

import GameStatusBar from "@/components/molecules/GameStatusBar";
import ControlPanel from "@/components/organisms/ControlPanel";
import usePlayer from "@/hooks/usePlayer";

import {
  Container,
  Inner,
  PlayerInfoBox,
  PlayerName,
  RewardBox,
  Score,
} from "@/styles/play.styles";

export default function PlayGame() {
  const player = usePlayer();

  return (
    <Container isMobile={isMobile}>
      <Inner>
        <PlayerInfoBox>
          <RewardBox>
            {Array.from(
              Array(Number(player?.gotFirstPlace) >= 5 ? 5 : Number(player?.gotFirstPlace)),
            ).map((_, index) => (
              <Image
                key={`star-${index}`}
                src="/assets/images/star.svg"
                alt="start"
                width={17}
                height={17}
              />
            ))}
          </RewardBox>
          <PlayerName>{player?.headTag}</PlayerName>
          <Score>{player?.thisRoundScore || 0}</Score>
        </PlayerInfoBox>
        <ControlPanel />
        <GameStatusBar />
      </Inner>
    </Container>
  );
}
