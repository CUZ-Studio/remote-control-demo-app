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
  background-image: url("/assets/images/makeRobot/nightSky.png");
  background-size: contain;
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 106px 20px 31px;
`;

export const GradientPaper = styled("div")`
  position: absolute;
  width: inherit;
  height: 100%;
  background: linear-gradient(360deg, #141828 67.71%, rgba(20, 24, 40, 0) 100%);
`;

export const Greeting = styled("h3")`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  white-space: pre-wrap;
`;

export const CanvasWrapper = styled("div")`
  position: relative;
  aspect-ratio: 1;
  width: 83.5%;
  margin: 0 auto 12px;
`;

export const PlayButton = styled("button")`
  position: relative;
  width: 100%;
  border: none;
  border-radius: 28px;
  padding: 17px 0;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background: linear-gradient(180deg, #2454ff -4.91%, #2544b3 8.83%, #2a0ce7 100%);
  margin-top: auto;
  box-shadow: 1px 2px 10px 0px #afbcff26;
`;

export const OptionBox = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 53px auto 72px;
  padding: 0 10px;
  gap: 10px;
`;

export const Option = styled("button", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  aspect-ratio: 1;

  background: -webkit-linear-gradient(
      180deg,
      rgba(157, 179, 255, 0.5) 0%,
      rgba(157, 214, 255, 0.5) 100%
    ),
    -webkit-linear-gradient(0deg, #fff, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  border: none;
  border-radius: 10px;
  box-shadow: ${({ isSelected }) =>
    isSelected ? "0px 0px 20px 0px #67a4ff4d, 0px 0px 7px 0px #3549ffb2" : "none"};
  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent; // remove blue box when clicking on elem
  touch-action: none;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: 10px;
    background: ${({ isSelected }) =>
      isSelected ? "linear-gradient(180deg, #8d99ff 0%, #7e8bff 100%)" : "#707E95"};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

export const BlackPaper = styled("div", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  display: ${({ isSelected }) => (isSelected ? "block" : "none")};
  position: absolute;
  width: 100%;
  height: 100%;
  background: #03070e50;
  z-index: -1;
`;

export const ModelName = styled("h3")`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-family: Pretendard;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  color: #5988ff;
`;

export const RobotDescription = styled("h5")`
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  white-space: pre-wrap;
  color: #8b98ad;
`;
