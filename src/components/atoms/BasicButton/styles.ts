import { styled } from "@mui/material/styles";

import { ButtonShape } from "@/types";

export const StyledButton = styled("button", {
  shouldForwardProp: (props) =>
    props !== "isSelected" && props !== "isPressed" && props !== "shape" && props !== "color",
})<{
  isSelected: boolean;
  isPressed: boolean;
  shape: ButtonShape;
  color: string;
}>`
  position: relative;
  font-family: "Pretendard";
  font-size: ${({ shape }) => {
    switch (shape) {
      case ButtonShape.CIRCLE:
      case ButtonShape.RECTANGLE:
      default:
        return "1rem";
    }
  }};
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  padding: ${({ shape }) => {
    switch (shape) {
      case ButtonShape.CIRCLE:
        return "0";
      case ButtonShape.RECTANGLE:
      default:
        return "14px 0";
    }
  }};
  border: ${({ shape, theme }) =>
    shape === ButtonShape.CIRCLE ? `1px solid ${theme.palette.common.black}` : "none"};
  border-radius: ${({ shape }) => {
    switch (shape) {
      case ButtonShape.CIRCLE:
        return "50%";
      case ButtonShape.RECTANGLE:
      default:
        return "10px";
    }
  }};
  cursor: pointer;
  color: ${({ theme, isPressed }) =>
    isPressed ? theme.palette.secondary.main : theme.palette.secondary.contrastText};
  background-color: ${({ theme, color, isPressed }) => {
    if (color) return isPressed ? theme.palette.secondary.contrastText : color;
    else {
      return isPressed ? theme.palette.secondary.contrastText : theme.palette.secondary.main;
    }
  }};

  ${({ shape }) =>
    shape === ButtonShape.CIRCLE &&
    `
    width: 5vh;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `}

  ${({ isSelected }) =>
    isSelected &&
    `
  border-width: 2px;
  `}
`;
