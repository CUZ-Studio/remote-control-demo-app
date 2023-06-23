import { styled } from "@mui/material/styles";

import { ButtonShape } from "@/types";

export const StyledButton = styled("button", {
  shouldForwardProp: (props) => props !== "isSelected" && props !== "shape" && props !== "color",
})<{
  isSelected: boolean;
  shape: ButtonShape;
  color: string;
}>`
  position: relative;
  font-size: ${({ shape }) => {
    switch (shape) {
      case ButtonShape.CIRCLE:
        return "16px";
      case ButtonShape.RECTANGLE:
      default:
        return "12px";
    }
  }};
  line-height: 1.2;
  padding: ${({ shape }) => {
    switch (shape) {
      case ButtonShape.CIRCLE:
        return "0";
      case ButtonShape.RECTANGLE:
      default:
        return "24px 0";
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
        return "0px";
    }
  }};
  cursor: pointer;
  color: ${({ theme }) => theme.palette.common.black};
  background-color: ${({ theme, color }) => color || theme.palette.grey[200]};

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
