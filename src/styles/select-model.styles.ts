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

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.938rem;
`;

export const PlayButton = styled("button")`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background: linear-gradient(148.72deg, #1f35a7 17.49%, #01639b 80.13%);
`;

export const OptionBox = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 47px auto 78px;
  padding: 0 4.35%;
  gap: 10.25%;
`;

export const Option = styled("button", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  width: 100px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid
    ${({ theme, isSelected }) => (isSelected ? theme.palette.secondary.contrastText : "#A6AEC1")};
  border-radius: 10px;
  background-color: ${({ isSelected }) => (isSelected ? "#F6F8FE" : "transparent")};
`;

export const ModelInfoBox = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  margin-top: -15px;
`;

export const ModelName = styled("h3")`
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  color: #111111;
`;

export const RobotDescription = styled("h5")`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  white-space: pre-wrap;
  color: #6f6f6f;
`;

export const CardPopUp = styled("div")`
  position: absolute;
  width: 100%;
  height: 77.25vh;
  bottom: 0;
  background: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 40px 40px 0 0;
  padding: 31px 20px 34px;
`;
