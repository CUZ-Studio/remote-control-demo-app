import { MouseEventHandler, ReactNode } from "react";

import { StyledButton } from "./styles";
interface Props {
  type: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  onClick: MouseEventHandler;
}

export default function BasicButton({ type, children, onClick }: Props) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
