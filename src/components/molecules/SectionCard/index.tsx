import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useRouter } from "next/router";

import { Page } from "@/types";

import { Card, EnterButton, SectionNumber, SubTitle, Title } from "./styles";

interface Props {
  sectionNumber: number;
  selectedSection: number;
  setSelectedSection: Dispatch<SetStateAction<number>>;
}

export default function SectionCard({ sectionNumber, selectedSection, setSelectedSection }: Props) {
  const router = useRouter();
  const cardInfo = (() => {
    switch (sectionNumber) {
      case 3: {
        return {
          title: `Journey\nto the past`,
          subTitle: `과거로의\n여정`,
        };
      }
      case 4: {
        return {
          title: "Time Walker",
          subTitle: `시간여행자의\n영광`,
        };
      }
      case 2:
      default: {
        return {
          title: "Time Portal",
          subTitle: "타임포탈",
        };
      }
    }
  })();

  const order = (() => {
    if (selectedSection === 2) {
      if (sectionNumber === 4) return "top";
      else if (sectionNumber === 2) return "middle";
      else if (sectionNumber === 3) return "bottom";
    } else if (selectedSection === 3) {
      if (sectionNumber === 2) return "top";
      else if (sectionNumber === 3) return "middle";
      else if (sectionNumber === 4) return "bottom";
    } else if (selectedSection === 4) {
      if (sectionNumber === 3) return "top";
      else if (sectionNumber === 4) return "middle";
      else if (sectionNumber === 2) return "bottom";
    }
  })();

  const enterSection: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const path = (() => {
      switch (sectionNumber) {
        case 3:
        default: {
          return Page.SELECT_MODEL;
        }
      }
    })();

    router.push(path);
  };
  return (
    <Card
      order={order}
      isSelected={sectionNumber === selectedSection}
      onClick={() => setSelectedSection(sectionNumber)}
    >
      <SectionNumber isSelected={sectionNumber === selectedSection}>{sectionNumber}</SectionNumber>
      <Title isSelected={sectionNumber === selectedSection}>{cardInfo.title}</Title>
      <SubTitle isSelected={sectionNumber === selectedSection}>{cardInfo.subTitle}</SubTitle>
      {sectionNumber === selectedSection && (
        <EnterButton type="button" onClick={enterSection}>
          입장하기
        </EnterButton>
      )}
    </Card>
  );
}
