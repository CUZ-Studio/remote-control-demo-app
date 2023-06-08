import { ReactNode } from "react";
import { isMobile } from "react-device-detect";

import { Inner, Root } from "./styles";

interface Props {
  children: ReactNode;
}

export default function BasicLayout({ children }: Props) {
  return (
    <Root>
      <Inner isMobile={isMobile}>{children}</Inner>
    </Root>
  );
}
