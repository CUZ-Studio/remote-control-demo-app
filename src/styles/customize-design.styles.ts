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
  padding: 103px 20px 31px;
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
