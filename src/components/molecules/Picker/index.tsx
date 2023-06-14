import { proxy } from "valtio";

import BasicButton from "@/components/atoms/BasicButton";
import { ColorPalette } from "@/components/organisms/Model/styles";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import { ButtonShape, RobotColor, RobotModelType } from "@/types";

export const modelColorState = proxy({
  items: {
    SmartDrone_Body: RobotColor.WHITE,
    Probe: RobotColor.BLACK,
  },
});

interface Props {
  modelType: RobotModelType;
}

export default function Picker({ modelType }: Props) {
  const player = usePlayer();
  const { assignPlayer } = useGameActions();

  const selectModel = (modelColor: RobotColor) => {
    const key = (() => {
      switch (modelType) {
        case RobotModelType.SMART_DRONE:
          return "SmartDrone_Body";
        case RobotModelType.PROBE:
          return "Probe";
        default:
          break;
      }
    })();
    assignPlayer({
      ...player,
      color: modelColor,
    });
    if (key) modelColorState.items[key] = modelColor;
  };
  return (
    <ColorPalette>
      <BasicButton
        type="button"
        shape={ButtonShape.CIRCLE}
        color={RobotColor.YELLOW}
        isSelected={player?.color == RobotColor.YELLOW}
        onClick={() => selectModel(RobotColor.YELLOW)}
      />
      <BasicButton
        type="button"
        shape={ButtonShape.CIRCLE}
        color={RobotColor.BLUE}
        isSelected={player?.color == RobotColor.BLUE}
        onClick={() => selectModel(RobotColor.BLUE)}
      />
      <BasicButton
        type="button"
        shape={ButtonShape.CIRCLE}
        color={RobotColor.WHITE}
        isSelected={player?.color == RobotColor.WHITE}
        onClick={() => selectModel(RobotColor.WHITE)}
      />
      <BasicButton
        type="button"
        shape={ButtonShape.CIRCLE}
        color={RobotColor.GREEN}
        isSelected={player?.color == RobotColor.GREEN}
        onClick={() => selectModel(RobotColor.GREEN)}
      />
      <BasicButton
        type="button"
        shape={ButtonShape.CIRCLE}
        color={RobotColor.BLACK}
        isSelected={player?.color == RobotColor.BLACK}
        onClick={() => selectModel(RobotColor.BLACK)}
      />
      <BasicButton
        type="button"
        shape={ButtonShape.CIRCLE}
        color={RobotColor.RED}
        isSelected={player?.color == RobotColor.RED}
        onClick={() => selectModel(RobotColor.RED)}
      />
    </ColorPalette>
  );
}
