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
  background: linear-gradient(177.52deg, #02060d 2.07%, #141829 98.77%);
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 123px 20px 33px;
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

export const GameHistory = styled("div")`
  display: flex;
  gap: 0.5rem;
  width: fit-content;
  align-items: center;
  justify-content: center;
  margin: 24px auto 8px;
`;

export const HistoryName = styled("p")`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
  color: #6a8bff;

  -webkit-transform: skew(8deg);
  -moz-transform: skew(8deg);
  -o-transform: skew(8deg);
`;

export const HistoryContext = styled("div")`
  position: absolute;
  height: fit-content;
  display: flex;
  align-items: center;
  font-family: Pretendard;
  color: #cedbed;
  bottom: 9px;
  right: 12px;

  -webkit-transform: skew(8deg);
  -moz-transform: skew(8deg);
  -o-transform: skew(8deg);

  h4 {
    font-family: Pretendard;
    font-size: 25px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: right;
    margin: 0;
    opacity: 0.9;
  }
  h5 {
    font-family: Pretendard;
    font-size: 1rem;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    margin: 2px 0 0 2px;
  }
`;

export const Unit = styled("div")`
  position: relative;
  width: 88px;
  height: 73px;
  -webkit-transform: skew(-8deg);
  -moz-transform: skew(-8deg);
  -o-transform: skew(-8deg);
  background: #0000004d;
  box-shadow: 3px 4px 35px 0px #39a0ff40, 1px 2px 5px 0px #536eff80;
  padding: 9px 14px;

  &:first-of-type {
    border-radius: 8px 0 0 8px;
  }

  &:last-of-type {
    border-radius: 0 8px 8px 0;
  }
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: inherit;
  gap: 15px;
  position: relative;
  height: fit-content;
  margin-top: auto;
`;

export const ResetRobot = styled("span")`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  color: #6a8bff;
  margin: 0 auto;
  cursor: pointer;
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
`;

export const CanvasWrapper = styled("div")`
  position: relative;
  aspect-ratio: 1;
  width: 83.5%;
  margin: 0 auto;
  z-index: 1;
`;

export const RewardBox = styled("div")`
  position: relative;
  display: flex;
  margin: -22px auto 10px;
  gap: 3px;
  height: 22px;
`;

export const RobotName = styled("h3")`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 800;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  color: #cedbed;
`;
