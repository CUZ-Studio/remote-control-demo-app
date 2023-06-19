import useUser from "@/hooks/useUser";
import { ButtonShape } from "@/types";

import {
  ButtonWrapper,
  Container,
  Logo,
  MainSection,
  StartButton,
  SubTitle,
  Title,
  TitleWrapper,
} from "@/styles/home.styles";

export default function HomePage() {
  const user = useUser();
  return (
    <Container>
      <MainSection>
        <TitleWrapper>
          <Title>Dear Earth</Title>
          <SubTitle>: 시간여행자의 여정</SubTitle>
        </TitleWrapper>
      </MainSection>
      <ButtonWrapper>
        <StartButton
          type="button"
          disabled={!!user}
          shape={ButtonShape.RECTANGLE}
          onClick={() => {
            (window as Window).location = process.env.NEXT_PUBLIC_FURO_OAUTH_CUSTOM_URL as string;
          }}
        >
          시작하기
        </StartButton>
        <Logo>by CUZ</Logo>
      </ButtonWrapper>
    </Container>
  );
}
