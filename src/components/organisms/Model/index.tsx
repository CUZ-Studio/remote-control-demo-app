import usePlayer from "@/hooks/usePlayer";
import { RobotModelType } from "@/types";

import Penguin from "./Penguin_anim";
import Probe from "./Probe_anim";
import SmartDrone from "./SmartDrone_anim";

export default function Model() {
  const player = usePlayer();

  const getModel = (modelSelected: RobotModelType) => {
    switch (modelSelected) {
      case RobotModelType.PENGUIN:
        return <Penguin />;
      case RobotModelType.PROBE:
        return <Probe />;
      case RobotModelType.SMART_DRONE:
      default:
        return <SmartDrone />;
    }
  };

  return <>{getModel(player?.modelType as RobotModelType)}</>;
}
