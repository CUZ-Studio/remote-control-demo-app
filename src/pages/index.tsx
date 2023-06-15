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
          (window as Window).location = process.env.NEXT_PUBLIC_FURO_OAUTH_CUSTOM_URL as string;
        }}
      >
        카카오 로그인
      </BasicButton>
    </Container>
  );
}
