import { styled } from "@mui/material/styles";

export const StyledButton = styled("button", {
  shouldForwardProp: (props) => props !== "isPressed",
})<{
  isPressed: boolean;
}>`
  position: relative;
  width: 100%;
  border: none;
  border-radius: 28px;
  padding: 17px 0;
  margin-top: auto;

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background: linear-gradient(180deg, #2454ff -4.91%, #2544b3 8.83%, #2a0ce7 100%);
  box-shadow: 1px 2px 10px 0px #afbcff26;
  opacity: ${({ isPressed }) => (isPressed ? 0.7 : 1)};

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent; // remove blue box when clicking on elem
  touch-action: none;
`;
