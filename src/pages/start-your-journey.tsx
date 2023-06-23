import { useState } from "react";
import Image from "next/image";

import CardRoulette from "@/components/organisms/CardRoulette";

import {
  Container,
  ImageWrapper,
  PlaceholderImage,
  SubTitle,
  Title,
  TitleWrapper,
} from "@/styles/welcome.styles";

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
    <Container>
      <TitleWrapper>
        <Title>Dear Earth</Title>
        <SubTitle>: 시간여행자의 여정</SubTitle>
      </TitleWrapper>
      <ImageWrapper>
        {getImageSrc() && <Image fill src={getImageSrc()} alt={`section ${selectedSection}`} />}
      </ImageWrapper>
      <CardRoulette selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
    </Container>
  );
}
