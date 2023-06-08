import { MouseEventHandler } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import BasicButton from "@/components/atoms/BasicButton";

export default function Home() {
  const updateDisplayName: MouseEventHandler = (e) => {
    e.preventDefault();

    const uuid = uuidv4();
    axios
      .put("http://localhost:30010/remote/object/property", {
        objectPath: "/Game/StarterContent/Maps/Test.Test:PersistentLevel.BP_Player_C_4",
        access: "WRITE_TRANSACTION_ACCESS",
        propertyName: "displayName",
        propertyValue: {
          displayName: uuid,
        },
      })
      .then(() => {
        toast.success(uuid);
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") {
          toast.error("네트워크 연결을 확인하세요");
        }
      });
  };
  return (
    <>
      <BasicButton type="button" onClick={updateDisplayName}>
        이름 날리기
      </BasicButton>
    </>
  );
}
