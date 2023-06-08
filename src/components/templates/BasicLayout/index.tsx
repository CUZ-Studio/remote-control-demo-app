import { ReactNode } from "react";
import { isMobile } from "react-device-detect";

import Header from "@/components/organisms/Header";
import useUser from "@/hooks/useUser";

import { Inner, Root } from "./styles";

interface Props {
  children: ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const user = useUser();
  return (
    <>
      {user && <Header />}
      <Root>
        <Inner isMobile={isMobile}>{children}</Inner>
      </Root>
    </>
  );
}
