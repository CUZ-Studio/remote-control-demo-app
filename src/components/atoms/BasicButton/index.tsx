import { MouseEventHandler, ReactNode, TouchEventHandler } from "react";

import { ButtonShape } from "@/types";

import { StyledButton } from "./styles";
interface Props {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  shape: ButtonShape;
  children: ReactNode;
  onClick?: MouseEventHandler;
  onTouchStart?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
}

export default function BasicButton({
  type,
  shape,
  disabled,
  children,
  onClick,
  onTouchStart,
  onTouchEnd,
}: Props) {
  return (
    <StyledButton
      shape={shape}
      disabled={disabled}
      type={type}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </StyledButton>
  );
}
