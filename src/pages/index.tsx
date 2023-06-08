import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import BasicButton from "@/components/atoms/BasicButton";
import BasicInput from "@/components/atoms/BasicInput";
import ControlPanel from "@/components/organisms/ControlPanel";
import { ButtonShape } from "@/types";

import { Container, StyledForm } from "@/styles/home.styles";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const updateDisplayName: MouseEventHandler = (e) => {
    e.preventDefault();

    const uuid = uuidv4();
    axios
      .put("https://4cc9-121-133-22-1.ngrok-free.app/remote/object/property", {
        objectPath:
          "/Game/ThirdPerson/Maps/ThirdPersonMap.ThirdPersonMap:PersistentLevel.BP_Player_C_UAID_F02F74CEF9D24F8A01_2105859791.NameTag",
        access: "WRITE_TRANSACTION_ACCESS",
        propertyName: "Text",
        propertyValue: {
          Text: uuid,
        },
      })
      .then(() => {
        toast.success("이름 날리기 성공!");
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") {
          toast.error("네트워크 연결을 확인하세요");
        }
      });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    setInputValue(e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    axios
      .put("https://4cc9-121-133-22-1.ngrok-free.app/remote/object/property", {
        objectPath:
          "/Game/ThirdPerson/Maps/ThirdPersonMap.ThirdPersonMap:PersistentLevel.BP_Player_C_UAID_F02F74CEF9D24F8A01_2105859791.NameTag",
        access: "WRITE_TRANSACTION_ACCESS",
        propertyName: "Text",
        propertyValue: {
          Text: inputValue,
        },
      })
      .then(() => toast.success("이름 날리기 성공!"))
      .catch((e) => {
        if (e.code === "ERR_NETWORK") {
          toast.error("네트워크 연결을 확인하세요");
        }
      });
  };
  return (
    <Container>
      <BasicButton type="button" shape={ButtonShape.RECTANGLE} onClick={updateDisplayName}>
        랜덤 문자열
      </BasicButton>
      <StyledForm onSubmit={handleSubmit} noValidate>
        <BasicInput value={inputValue} onChange={handleChange} />
        <BasicButton type="submit" shape={ButtonShape.RECTANGLE}>
          이름 날리기
        </BasicButton>
      </StyledForm>
      <ControlPanel />
    </Container>
  );
}
