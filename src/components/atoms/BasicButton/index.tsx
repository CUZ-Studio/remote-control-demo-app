import { MouseEventHandler, ReactNode, TouchEventHandler, useState } from "react";

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
  const [isMouseHolding, setIsMouseHolding] = useState(false);
  const onMouseDown: MouseEventHandler = (e) => {
    e.preventDefault();
    setIsMouseHolding(true);
  };
  const onMouseUp: MouseEventHandler = (e) => {
    e.preventDefault();
    setIsMouseHolding(false);
  };
  return children ? (
    <StyledButton
      shape={shape}
      color={color?.toLowerCase() || ""}
      isSelected={!!isSelected}
      isPressed={isMouseHolding}
      disabled={disabled}
      type={type}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
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
      isPressed={isMouseHolding}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
}
