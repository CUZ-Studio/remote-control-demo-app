/* eslint-disable react/no-unknown-property */
import { degToRad } from "three/src/math/MathUtils";

import usePlayer from "@/hooks/usePlayer";
import { RobotModelType } from "@/types";
import { Euler, Vector3 } from "@react-three/fiber";

export default function Lights() {
  const player = usePlayer();

  const lightProps = (() => {
    const commonProps = {
      color: "0xffffff",
      shadowCameraNear: 0.2,
      shadowBias: 0.05,
      shadowNormalBias: 0.4,
      castShadow: true,
    };
    switch (player?.modelType) {
      case RobotModelType.PENGUIN:
      case RobotModelType.PROBE:
      case RobotModelType.SMART_DRONE:
      default: {
        return {
          keyLight: {
            ...commonProps,
            intensity: 3,
            angle: degToRad(80),
            position: [-5, 2, 2] as Vector3,
            rotation: [degToRad(13), degToRad(32), degToRad(-25)] as Euler,
          },
          fillLight: {
            ...commonProps,
            intensity: 1.5,
            angle: degToRad(80),
            position: [7, 0, -9] as Vector3,
            rotation: [degToRad(8), degToRad(-30), degToRad(15)] as Euler,
          },
          limLight: {
            ...commonProps,
            intensity: 0.7,
            angle: degToRad(80),
            position: [4, 3, 5] as Vector3,
            rotation: [degToRad(35), degToRad(215), degToRad(10)] as Euler,
          },
        };
      }
    }
  })();
  return (
    <>
      {/* key light */}
      <spotLight {...lightProps.keyLight} />
      {/* fill light */}
      <spotLight {...lightProps.fillLight} />
      {/* lim light */}
      <spotLight {...lightProps.limLight} />
    </>
  );
}
