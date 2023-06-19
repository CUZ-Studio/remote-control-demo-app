import { useEffect, useState } from "react";
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
  const [paletteColors, setPaletteColors] = useState<RobotColor[]>([]);

  const selectBodyColor = (modelColor: RobotColor) => {
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

  useEffect(() => {
    const colorsAvailable = (() => {
      switch (modelType) {
        case RobotModelType.PENGUIN:
          return [
            RobotColor.DARK_GREEN,
            RobotColor.AQUA,
            RobotColor.WHITE,
            RobotColor.GREEN,
            RobotColor.BLACK,
            RobotColor.BROWN,
          ];
        case RobotModelType.PROBE:
          return [
            RobotColor.BLACK,
            RobotColor.ORANGE,
            RobotColor.WHITE,
            RobotColor.BROWN,
            RobotColor.INDIGO,
            RobotColor.SKY_BLUE,
          ];
          break;
        case RobotModelType.SMART_DRONE:
          return [
            RobotColor.YELLOW,
            RobotColor.BLUE,
            RobotColor.WHITE,
            RobotColor.GREEN,
            RobotColor.GRAY,
            RobotColor.RED,
          ];
        default:
          break;
      }
    })();
    console.log(colorsAvailable);
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
          isSelected={player?.color == color}
          onClick={() => selectBodyColor(color)}
        />
      ))}
    </ColorPalette>
  );
}
