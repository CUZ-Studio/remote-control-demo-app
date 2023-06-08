import { MouseEventHandler, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import BasicButton from "@/components/atoms/BasicButton";
import ControlPanel from "@/components/organisms/ControlPanel";
import useUser from "@/hooks/useUser";
import { ButtonShape, Page } from "@/types";

import { Container } from "@/styles/play.styles";

export default function Home() {
  const router = useRouter();
  const user = useUser();

  const updateDisplayName: MouseEventHandler = (e) => {
    e.preventDefault();

    if (!user) {
      router.replace(Page.HOME);
      return;
    }

    const uuid = uuidv4();
    axios
      .put("https://4cc9-121-133-22-1.ngrok-free.app/remote/object/property", {
        objectPath:
          "/Game/ThirdPerson/Maps/ThirdPersonMap.ThirdPersonMap:PersistentLevel.BP_Player_C_UAID_F02F74CEF9D24F8A01_2105859791.NameTag",
        access: "WRITE_TRANSACTION_ACCESS",
        propertyName: "Text",
        propertyValue: {
          Text: `@${user.username}___${uuid}`,
        },
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") {
          toast.error("네트워크 연결을 확인하세요");
        }
      });
  };

  useEffect(() => {
    if (!user) {
      router.replace(Page.HOME);
    }
  }, []);
  return (
    <Container>
      <BasicButton type="button" shape={ButtonShape.RECTANGLE} onClick={updateDisplayName}>
        플레이어 랜덤 ID 배정받기
      </BasicButton>
      <ControlPanel />
    </Container>
  );
}
