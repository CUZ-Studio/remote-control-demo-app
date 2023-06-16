import { styled } from "@mui/material/styles";

import BasicButton from "@/components/atoms/BasicButton";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 13px 0 0;
`;

export const MainSection = styled("main")`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Greeting = styled("h3")`
  white-space: pre;
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const NextButton = styled(BasicButton)`
  width: 100%;
`;

export const OptionBox = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 54px auto 65px;
  padding: 0 17px;
  gap: 40px;
`;

export const Option = styled("button")`
  width: 77px;
  height: 77px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;

export const RobotDescription = styled("span")`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: center;
  white-space: pre-wrap;
`;
