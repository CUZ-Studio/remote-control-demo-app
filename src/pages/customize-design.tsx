/* eslint-disable react/no-unknown-property */
import { useRouter } from "next/router";
import _ from "lodash";
import { isMobile } from "react-device-detect";

import PlayButton from "@/components/atoms/PlayButton";
import Picker from "@/components/molecules/Picker";
import Model from "@/components/organisms/Model";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import { Player } from "@/slices/game";
import { Page, RobotColor } from "@/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import {
  CanvasWrapper,
  Container,
  GradientPaper,
  Greeting,
  Inner,
} from "@/styles/customize-design.styles";

export default function CustomizeModel() {
  const router = useRouter();
  const player = usePlayer();

  const { assignPlayer } = useGameActions();

  const handleClick = () => {
    if (_.isNil(player?.modelType)) {
      assignPlayer({
        ...(player as Player),
        modelColor: RobotColor.WHITE,
      });
    }
    router.push(Page.NAME_YOUR_ROBOT);
  };
  return (
    <Container isMobile={isMobile}>
      <GradientPaper />
      <Inner>
        <Greeting>{`로봇의 색상을\n선택해주세요`}</Greeting>
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
        <Picker modelType={player?.modelType || null} />
        <PlayButton type="button" onClick={handleClick}>
          다음
        </PlayButton>
      </Inner>
    </Container>
  );
}
