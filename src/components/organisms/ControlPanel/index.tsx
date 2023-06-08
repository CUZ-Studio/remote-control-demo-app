import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import BasicButton from "@/components/atoms/BasicButton";
import { ButtonShape } from "@/types";

export default function ControlPanel() {
  const [moveForwardValue, setMoveForwardValue] = useState(0);

  useEffect(() => {
    (() => {
      axios
        .put("https://4cc9-121-133-22-1.ngrok-free.app/remote/object/property", {
          objectPath:
            "/Game/ThirdPerson/Maps/ThirdPersonMap.ThirdPersonMap:PersistentLevel.BP_Player_C_UAID_F02F74CEF9D24F8A01_2105859791.NameTag",
          access: "WRITE_TRANSACTION_ACCESS",
          propertyName: "MoveForward",
          propertyValue: {
            MoveForward: moveForwardValue,
          },
        })
        .catch((e) => {
          if (e.code === "ERR_NETWORK") {
            toast.error("네트워크 연결을 확인하세요");
          }
        });
    })();
  }, [moveForwardValue]);

  return (
    <BasicButton
      type="button"
      shape={ButtonShape.CIRCLE}
      onTouchStart={() => setMoveForwardValue(1)}
      onTouchEnd={() => setMoveForwardValue(0)}
    >
      앞으로
    </BasicButton>
  );
}
