import { styled } from "@mui/material/styles";

export const StyledButton = styled("button", {
  shouldForwardProp: (props) => props !== "isSelected" && props !== "isPressed",
})<{
  isSelected: boolean;
  isPressed: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 55px;

  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.5;

  z-index: 0;
  border: none;
  outline: none;
  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent; // remove blue box when clicking on elem
  touch-action: none;

  ${({ isPressed }) =>
    isPressed &&
    `
color: #070910;
  background: transparent;
`};

  ${({ isPressed, theme }) =>
    !isPressed &&
    `
background: linear-gradient(
  180deg,
  rgba(157, 179, 255, 0.5) 0%,
  rgba(157, 214, 255, 0.5) 100%
),
linear-gradient(0deg, ${theme.palette.common.white}, ${theme.palette.common.white});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
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
