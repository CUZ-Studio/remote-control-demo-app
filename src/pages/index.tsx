import BasicButton from "@/components/atoms/BasicButton";
import useUser from "@/hooks/useUser";
import { ButtonShape } from "@/types";

import { Container } from "@/styles/home.styles";

export default function HomePage() {
  const user = useUser();
  return (
    <Container>
      <BasicButton
        type="button"
        disabled={!!user}
        shape={ButtonShape.RECTANGLE}
        onClick={() => {
          (window as Window).location =
            "https://api.furo.one/oauth?platform=kakao&public_api_key=apikey-public-live-419a0ea4-86ee-463a-a429-e875721415ff";
        }}
      >
        카카오 로그인
      </BasicButton>
    </Container>
  );
}
