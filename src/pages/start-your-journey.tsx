import { useState } from "react";
import Image from "next/image";
import { isMobile } from "react-device-detect";

import CardRoulette from "@/components/organisms/CardRoulette";

import {
  Container,
  ImageWrapper,
  Inner,
  SubTitle,
  Title,
  TitleWrapper,
} from "@/styles/start-your-journey.styles";

export default function Welcome() {
  const [selectedSection, setSelectedSection] = useState(3);

  const getImageSrc = () => {
    switch (selectedSection) {
      case 2:
      case 4:
        return "";
      case 3:
      default:
        return "/assets/images/section2.svg";
    }
  };
  return (
    <Container isMobile={isMobile}>
      <Inner>
        <TitleWrapper>
          <Title>Dear Earth</Title>
          <SubTitle>시간여행자의 여정</SubTitle>
        </TitleWrapper>
        <ImageWrapper>
          {getImageSrc() && (
            <Image
              src={getImageSrc()}
              alt={`section ${selectedSection}`}
              width={364}
              height={364}
            />
          )}
        </ImageWrapper>
        <CardRoulette selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
      </Inner>
    </Container>
  );
}
