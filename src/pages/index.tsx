import Image from "next/image";
import { isMobile } from "react-device-detect";

import { ButtonShape } from "@/types";

import {
  ButtonWrapper,
  Container,
  Inner,
  StartButton,
  SubTitle,
  Title,
  TitleWrapper,
} from "@/styles/home.styles";

export default function HomePage() {
  return (
    <Container isMobile={isMobile}>
      <Image
        src="/assets/images/home/nightSky.svg"
        alt="night_sky"
        fill
        style={{
          zIndex: 2,
        }}
      />
      <Inner>
        <TitleWrapper>
          <Title>Dear Earth</Title>
          <SubTitle>시간여행자의 여정</SubTitle>
        </TitleWrapper>
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
