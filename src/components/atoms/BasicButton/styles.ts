import { styled } from "@mui/material/styles";

import { ButtonShape } from "@/types";

export const StyledButton = styled("button", {
  shouldForwardProp: (props) => props !== "shape",
})<{
  shape: ButtonShape;
}>`
  position: relative;
  font-size: ${({ shape }) => {
    switch (shape) {
      case ButtonShape.CIRCLE:
        return "48px";
      case ButtonShape.RECTANGLE:
      default:
        return "16px";
    }
  }};
  padding: ${({ shape }) => {
    switch (shape) {
      case ButtonShape.CIRCLE:
        return "0";
      case ButtonShape.RECTANGLE:
      default:
        return "16px";
    }
  }};
  border: 1px solid
    ${({ theme, disabled }) => (disabled ? theme.palette.grey[100] : theme.palette.common.black)};
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

  ${({ shape }) =>
    shape === ButtonShape.CIRCLE &&
    `
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;
