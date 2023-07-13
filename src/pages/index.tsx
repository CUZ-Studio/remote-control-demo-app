import Image from "next/image";
import { isMobile } from "react-device-detect";

import { ButtonShape } from "@/types";

import {
  ButtonWrapper,
  Colon,
  Container,
  Inner,
  StartButton,
  SubTitle,
  SubTitleWrapper,
  Title,
  TitleSection,
} from "@/styles/home.styles";

export default function HomePage() {
  return (
    <Container isMobile={isMobile}>
      <Image src="/assets/images/home/background.svg" alt="background image" fill />
      <Inner>
        <TitleSection>
          <Title>DEAR EARTH</Title>
          <SubTitleWrapper>
            <Colon>:</Colon>
            <SubTitle>Time Walker</SubTitle>
          </SubTitleWrapper>
        </TitleSection>
        <ButtonWrapper>
          <StartButton
            type="button"
            shape={ButtonShape.RECTANGLE}
            onClick={() => {
              (window as Window).location = process.env.NEXT_PUBLIC_FURO_OAUTH_CUSTOM_URL as string;
            }}
          >
            시작하기
          </StartButton>
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={65}
            height={65}
            style={{
              margin: "0 auto",
            }}
          />
        </ButtonWrapper>
      </Inner>
    </Container>
  );
}
