import { styled } from "@mui/material/styles";

import { ButtonShape } from "@/types";

export const StyledButton = styled("button", {
  shouldForwardProp: (props) => props !== "shape",
})<{
  shape: ButtonShape;
}>`
  font-size: 20px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.palette.common.black};
  border-radius: ${({ shape }) => {
    switch (shape) {
      case ButtonShape.CIRCLE:
        return "50%";
      case ButtonShape.RECTANGLE:
      default:
        return "0px";
    }
  }};

  ${({ shape }) =>
    shape === ButtonShape.CIRCLE &&
    `
    aspect-ratio: 1;
  `}
`;
