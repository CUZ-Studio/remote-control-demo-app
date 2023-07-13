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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: Pretendard;
  font-size: ${({ shape }) => {
    switch (shape) {
      case ButtonShape.CIRCLE:
      case ButtonShape.RECTANGLE:
      default:
        return "1.125rem";
    }
  }};
  font-weight: 700;
  line-height: 21.48px;

  width: 100%;
  height: 55px;

  z-index: 0;
  border: none;

  ${({ isPressed, theme }) =>
    isPressed
      ? `
  color: #070910;
  background: transparent;
  `
      : `
      background: -webkit-linear-gradient(
    180deg,
    rgba(157, 179, 255, 0.5) 0%,
    rgba(157, 214, 255, 0.5) 100%
  ),
  linear-gradient(0deg, ${theme.palette.common.white}, ${theme.palette.common.white});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`}

  cursor: pointer;

  ${({ shape }) =>
    shape === ButtonShape.CIRCLE &&
    `
    width: 5vh;
    height: 5vh;
  `}

  &::before {
    width: 100%;
    height: inherit;
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    padding: 2px;
    border-radius: 28px;
    background: linear-gradient(180deg, #9db3ff 0%, #9dd6ff 100%);

    ${({ isPressed }) =>
      !isPressed &&
      `
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    `}
  }
`;
