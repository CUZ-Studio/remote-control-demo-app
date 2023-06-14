import usePlayer from "@/hooks/usePlayer";
import { RobotModelType } from "@/types";

import Probe from "./Probe";
import SmartDrone from "./SmartDrone";

export default function Model() {
  const player = usePlayer();

  const getModel = (modelSelected: RobotModelType) => {
    switch (modelSelected) {
      case RobotModelType.PROBE:
        return <Probe />;
      case RobotModelType.SMART_DRONE:
      default:
        return <SmartDrone />;
    }
  };

  return <>{getModel(player?.model)}</>;
}
