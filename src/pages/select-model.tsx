import { useRouter } from "next/router";

import BasicButton from "@/components/atoms/BasicButton";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import { ButtonShape, Page, RobotModelType } from "@/types";

import { ButtonWrapper, Container } from "@/styles/select-model.styles";

export default function SelectRobot() {
  const router = useRouter();
  const player = usePlayer();
  const { assignPlayer } = useGameActions();

  const selectModel = (modelType: RobotModelType) => {
    assignPlayer({
      ...player,
      model: modelType,
    });
  };
  return (
    <Container>
      <h1>로봇 모델 선택</h1>
      <ButtonWrapper>
        <BasicButton
          type="button"
          shape={ButtonShape.RECTANGLE}
          isSelected={player?.model == RobotModelType.SMART_DRONE}
          onClick={() => selectModel(RobotModelType.SMART_DRONE)}
        >
          Smart Drone
        </BasicButton>
        <BasicButton
          type="button"
          shape={ButtonShape.RECTANGLE}
          isSelected={player?.model == RobotModelType.PROBE}
          onClick={() => selectModel(RobotModelType.PROBE)}
        >
          Probe
        </BasicButton>
        <BasicButton
          type="button"
          shape={ButtonShape.RECTANGLE}
          isSelected={player?.model == RobotModelType.PENGUIN}
          onClick={() => selectModel(RobotModelType.PENGUIN)}
        >
          Penguin
        </BasicButton>
      </ButtonWrapper>
      <BasicButton
        type="button"
        shape={ButtonShape.RECTANGLE}
        disabled={!player?.model}
        onClick={() => router.push(Page.CUSTOMIZE_DESIGN)}
      >
        색상 선택하러 가기
      </BasicButton>
    </Container>
  );
}
