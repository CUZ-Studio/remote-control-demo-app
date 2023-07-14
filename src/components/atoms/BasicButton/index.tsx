import { MouseEventHandler, ReactNode, TouchEventHandler, useState } from "react";

import { StyledButton } from "./styles";

interface Props {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  isSelected?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler;
}

export default function BasicButton({ type, disabled, isSelected, children, onClick }: Props) {
  const [isMouseHolding, setIsMouseHolding] = useState(false);
  const onMouseDown: MouseEventHandler = (e) => {
    e.preventDefault();
    setIsMouseHolding(true);
  };
  const onMouseUp: MouseEventHandler = (e) => {
    e.preventDefault();
    setIsMouseHolding(false);
  };
  const onTouchStart: TouchEventHandler = () => {
    setIsMouseHolding(true);
  };
  const onTouchEnd: TouchEventHandler = () => {
    setIsMouseHolding(false);
  };
  return (
    <StyledButton
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
  );
}
