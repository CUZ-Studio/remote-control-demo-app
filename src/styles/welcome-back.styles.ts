import { styled } from "@mui/material/styles";

import BasicButton from "@/components/atoms/BasicButton";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const MainSection = styled("main")`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TitleWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Welcome = styled("p")`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
`;

export const Greeting = styled("h3")`
  white-space: pre;
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
`;

export const GameHistory = styled("div")`
  display: flex;
  gap: 69px;
  width: fit-content;
  align-items: center;
  justify-content: center;
  margin: 36px auto 8px;
`;

export const HistoryName = styled("span")`
  font-family: Inter;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  margin: 0;
`;

export const HistoryContext = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.grey[200]};
`;

export const Unit = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const ResetRobot = styled("span")`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0 auto;
  cursor: pointer;
`;

export const PlayButton = styled(BasicButton)`
  width: 100%;
`;

export const CanvasWrapper = styled("div")`
  position: relative;
  aspect-ratio: 1;
  width: 100%;
`;

export const StarBox = styled("div")`
  position: absolute;
  bottom: 0;
  z-index: 3;
  display: flex;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
`;

export const RobotName = styled("span")`
  margin: 5px auto 0;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  padding: 4px 25.5px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;
