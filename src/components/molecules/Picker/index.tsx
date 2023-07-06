import { useEffect, useState } from "react";
import { proxy } from "valtio";

import BasicButton from "@/components/atoms/BasicButton";
import { ColorPalette } from "@/components/organisms/Model/styles";
import useGameActions from "@/hooks/useGameActions";
import usePlayer from "@/hooks/usePlayer";
import { Player } from "@/slices/game";
import { ButtonShape, RobotColor, RobotModelType } from "@/types";

export const modelColorState = proxy({
  items: {
    SmartDrone_Body_Material: RobotColor.WHITE,
    Probe_Material: RobotColor.BLACK,
    Penguin_Material: RobotColor.BLACK,
  },
});

interface Props {
  modelType: RobotModelType | null;
}

export default function Picker({ modelType }: Props) {
  const player = usePlayer();
  const { assignPlayer } = useGameActions();
  const [paletteColors, setPaletteColors] = useState<RobotColor[]>([]);

  const selectBodyColor = (modelColor: RobotColor) => {
    const key = (() => {
      switch (modelType) {
        case RobotModelType.SMART_DRONE:
          return "SmartDrone_Body_Material";
        case RobotModelType.PROBE:
          return "Probe_Material";
        case RobotModelType.PENGUIN:
          return "Penguin_Material";
        default:
          break;
      }
    })();
    assignPlayer({
      ...(player as Player),
      modelColor,
    });
    if (key) modelColorState.items[key] = modelColor;
  };

  useEffect(() => {
    const colorsAvailable = (() => {
      switch (modelType) {
        case RobotModelType.PENGUIN:
        case RobotModelType.PROBE:
        case RobotModelType.SMART_DRONE:
        default:
          return [
            RobotColor.YELLOW,
            RobotColor.BLUE,
            RobotColor.WHITE,
            RobotColor.GREEN,
            RobotColor.BLACK,
            RobotColor.RED,
          ];
      }
    })();
    if (colorsAvailable) setPaletteColors(colorsAvailable);
  }, [modelType]);
  return (
    <ColorPalette>
      {paletteColors.map((color) => (
        <BasicButton
          key={`${modelType}_${color}`}
          type="button"
          shape={ButtonShape.CIRCLE}
          color={color}
          isSelected={
            player?.modelColor ? player?.modelColor === color : RobotColor.WHITE === color
          }
          onClick={() => selectBodyColor(color)}
        />
      ))}
    </ColorPalette>
  );
}
