/* eslint-disable react/no-unknown-property */
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";

import Model from "@/components/organisms/Model";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import useUser from "@/hooks/useUser";
import { Player } from "@/slices/game";
import { Page, RobotModelType } from "@/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import {
  ButtonWrapper,
  CardPopUp,
  Container,
  Greeting,
  Inner,
  ModelInfoBox,
  ModelName,
  Option,
  OptionBox,
  PlayButton,
  RobotDescription,
} from "@/styles/select-model.styles";
import { CanvasWrapper } from "@/styles/welcome-back.styles";

export default function SelectRobot() {
  const router = useRouter();
  const user = useUser();
  const player = usePlayer();
  const { assignPlayer } = useGameActions();

  const selectModel = (modelType: RobotModelType) => {
    assignPlayer({
      ...(player as Player),
      modelType,
    });
  };

  const getDescription = (modelType: RobotModelType) => {
    if (modelType === undefined) return;
    switch (modelType) {
      case RobotModelType.PROBE:
        return `화가 나면 복어처럼 부풀어올라요!`;
      case RobotModelType.PENGUIN:
        return `화가 나면 파닥거리면서 불이 나와요!`;
      case RobotModelType.SMART_DRONE:
      default:
        return `화가 나면 무서운 표정으로 바뀌어요!`;
    }
  };

  useEffect(() => {
    assignPlayer({
      ...(player as Player),
      modelColor: null,
    });
  }, []);
  return (
    <Container isMobile={isMobile}>
      <Inner>
        <Greeting>{`${user?.displayName}님, 함께 지구를 살릴\n로봇을 생성해주세요!`}</Greeting>
        <CardPopUp>
          <CanvasWrapper>
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 60 }}>
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
            <ModelInfoBox>
              <ModelName>{player?.modelType}</ModelName>
              <RobotDescription>
                {getDescription(player?.modelType as RobotModelType)}
              </RobotDescription>
            </ModelInfoBox>
          </CanvasWrapper>
          <OptionBox>
            <Option
              type="button"
              onClick={() => selectModel(RobotModelType.PENGUIN)}
              isSelected={player?.modelType === RobotModelType.PENGUIN}
            >
              <Image width={77} height={77} src="/assets/images/models/penguin.svg" alt="penguin" />
            </Option>
            <Option
              type="button"
              onClick={() => selectModel(RobotModelType.SMART_DRONE)}
              isSelected={
                player?.modelType ? player?.modelType === RobotModelType.SMART_DRONE : true
              }
            >
              <Image
                width={77}
                height={77}
                src="/assets/images/models/smartDrone.svg"
                alt="smart drone"
              />
            </Option>
            <Option
              type="button"
              onClick={() => selectModel(RobotModelType.PROBE)}
              isSelected={player?.modelType === RobotModelType.PROBE}
            >
              <Image width={77} height={77} src="/assets/images/models/probe.svg" alt="probe" />
            </Option>
          </OptionBox>
          <ButtonWrapper>
            <PlayButton
              type="button"
              disabled={!player?.modelType}
              onClick={() => router.push(Page.CUSTOMIZE_DESIGN)}
            >
              다음
            </PlayButton>
          </ButtonWrapper>
        </CardPopUp>
      </Inner>
    </Container>
  );
}
