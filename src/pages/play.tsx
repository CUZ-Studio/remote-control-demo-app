/* eslint-disable react/no-unknown-property */
import Image from "next/image";
import { isMobile } from "react-device-detect";

import ControlPanel from "@/components/organisms/ControlPanel";
import Model from "@/components/organisms/Model";
import useGameStatus from "@/hooks/useGameRound";
import usePlayer from "@/hooks/usePlayer";
import { TimeSchedule } from "@/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Waiting } from "@/styles/going-to-hangar.styles";
import {
  CanvasWrapper,
  Container,
  Inner,
  LiteralInfo,
  PlayerInfoBox,
  PlayerName,
  RewardBox,
  Score,
  ScoreInfo,
} from "@/styles/play.styles";

export default function PlayGame() {
  const player = usePlayer();
  const { isGameInProgress, currentTimeSchedule } = useGameStatus();
  const isActive = isGameInProgress && currentTimeSchedule === TimeSchedule.GAMING;
  return (
    <Container isMobile={isMobile}>
      <Inner>
        <PlayerInfoBox>
          <CanvasWrapper>
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
              <ambientLight intensity={0.8} />
              <spotLight intensity={0.1} angle={0.1} penumbra={1} position={[10, 15, 10]} />
              <Model />
              <OrbitControls
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
              />
            </Canvas>
          </CanvasWrapper>
          <LiteralInfo>
            <RewardBox>
              {Array.from(
                Array(Number(player?.gotFirstPlace) >= 5 ? 5 : Number(player?.gotFirstPlace)),
              ).map((_, index) => (
                <Image
                  key={`star-${index}`}
                  src="/assets/images/star.svg"
                  alt="start"
                  width={15}
                  height={15}
                />
              ))}
            </RewardBox>
            <PlayerName>{player?.headTag}</PlayerName>
          </LiteralInfo>
        </PlayerInfoBox>
        <ControlPanel />
        <ScoreInfo isActive={isActive}>
          {isActive ? (
            <>
              <p>SCORE</p>
              <Score isActive={isActive}>{player?.thisRoundScore || 0}</Score>
            </>
          ) : (
            <>
              <Waiting>
                <p>∙ ∙ ∙</p> <p>Please wait</p> <p>∙ ∙ ∙</p>
              </Waiting>
              <Score isActive={isActive}>곧 미션이 시작됩니다!</Score>
            </>
          )}
        </ScoreInfo>
      </Inner>
    </Container>
  );
}
