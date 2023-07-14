import { styled } from "@mui/material/styles";

export const Container = styled("div", {
  shouldForwardProp: (props) => props !== "isMobile",
})<{
  isMobile: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ isMobile }) => (isMobile ? "100%" : "425px")};
  margin: 0 auto;
  box-sizing: border-box;
  background: #02081e;
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 134px 21px 113px;
`;

export const CanvasWrapper = styled("div")`
  position: relative;
  aspect-ratio: 1;
  width: 100px;
  margin-left: 10px;
`;

export const PlayerInfoBox = styled("div")`
  position: relative;
  width: 68%;
  display: grid;
  grid-template-rows: 100px;
  grid-template-columns: auto 1fr;
  grid-column-gap: 12px;
  align-items: center;
  background: -webkit-linear-gradient(
      180deg,
      rgba(157, 179, 255, 0.5) 0%,
      rgba(157, 214, 255, 0.5) 100%
    ),
    linear-gradient(0deg, #fff, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-radius: 10px;
  padding: 0 5px;
  margin: 0 40px;
  box-sizing: border-box;
  box-shadow: 3px 4px 20px 0px #6fa0ff26, 0px 0px 3px 0px #536eff80;

  &::before {
    width: 100%;
    height: inherit;
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    padding: 1px;
    border-radius: 10px;
    background: linear-gradient(180deg, #9db3ff 0%, #9dd6ff 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

export const LiteralInfo = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const RewardBox = styled("div")`
  display: flex;
  gap: 2px;
`;

export const PlayerName = styled("p")`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
  color: #cedbed;
`;

export const ScoreInfo = styled("div", {
  shouldForwardProp: (props) => props !== "isActive",
})<{
  isActive: boolean;
}>`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ isActive }) => (isActive ? "10px" : "8px")};
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 35px;
    letter-spacing: 0em;
    text-align: center;
    color: #a6aec1;
  }
`;

export const Score = styled("h1", {
  shouldForwardProp: (props) => props !== "isActive",
})<{
  isActive: boolean;
}>`
  font-family: Pretendard;
  font-size: ${({ isActive }) => (isActive ? "55px" : "28px")};
  font-weight: 700;
  line-height: ${({ isActive }) => (isActive ? "35px" : "42px")};
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  color: #cedbed;
`;
