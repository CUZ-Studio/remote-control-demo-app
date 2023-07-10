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
  background: linear-gradient(172.95deg, #071958 3.01%, #073658 40.35%);
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 106px 0 0;
`;

export const MainSection = styled("main")`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  margin: 20px auto 8px;
`;

export const HistoryName = styled("p")`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
  color: #c7ddff;

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
  color: ${({ theme }) => theme.palette.primary.contrastText};
  bottom: 7px;
  right: 12px;

  -webkit-transform: skew(8deg);
  -moz-transform: skew(8deg);
  -o-transform: skew(8deg);

  h4 {
    font-size: 22px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: right;
    margin: 0;
    opacity: 0.9;
  }
  h5 {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    margin: 2px 0 0 2px;
    opacity: 0.9;
  }
`;

export const Unit = styled("div")`
  position: relative;
  width: 90px;
  height: 62px;
  -webkit-transform: skew(-8deg);
  -moz-transform: skew(-8deg);
  -o-transform: skew(-8deg);
  background: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0px 1px 30px rgba(0, 158, 207, 0.15);
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
  margin-top: auto;
  height: fit-content;
`;

export const ResetRobot = styled("span")`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  margin: 0 auto;
  cursor: pointer;
`;

export const PlayButton = styled("button")`
  position: relative;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background: linear-gradient(148.72deg, #1f35a7 17.49%, #01639b 80.13%);
`;

export const CanvasWrapper = styled("div")`
  position: relative;
  aspect-ratio: 1;
  width: 72.56%;
  margin: 0 auto;
`;

export const RewardBox = styled("div")`
  position: absolute;
  bottom: 17px;
  z-index: 3;
  display: flex;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  gap: 2px;
`;

export const RobotName = styled("h3")`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 800;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
`;

export const CardPopUp = styled("div")`
  position: absolute;
  width: 100%;
  height: 64vh;
  bottom: 0;
  background: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 40px 40px 0 0;
  padding: 31px 20px 34px;
  display: flex;
  flex-direction: column;
`;
