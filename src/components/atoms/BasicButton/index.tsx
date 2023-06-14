import { MouseEventHandler, ReactNode, TouchEventHandler } from "react";

import { ButtonShape, RobotColor } from "@/types";

import { StyledButton } from "./styles";
interface Props {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  shape: ButtonShape;
  color?: RobotColor;
  isSelected?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler;
  onTouchStart?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
}

export default function BasicButton({
  type,
  shape,
  color,
  disabled,
  isSelected,
  children,
  onClick,
  onTouchStart,
  onTouchEnd,
}: Props) {
  return children ? (
    <StyledButton
      shape={shape}
      color={color?.toLowerCase() || ""}
      isSelected={!!isSelected}
      disabled={disabled}
      type={type}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </StyledButton>
  ) : (
    <StyledButton
      shape={shape}
      color={color?.toLowerCase() || ""}
      disabled={disabled}
      type={type}
      isSelected={!!isSelected}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    />
  );
}
