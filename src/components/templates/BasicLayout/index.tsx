import { ReactNode } from "react";

import { Inner, Root } from "./styles";

interface Props {
  children: ReactNode;
}

export default function BasicLayout({ children }: Props) {
  return (
    <Root>
      <Inner>{children}</Inner>
    </Root>
  );
}
