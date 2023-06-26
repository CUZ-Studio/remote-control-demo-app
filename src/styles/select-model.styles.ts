import { styled } from "@mui/material/styles";

import BasicButton from "@/components/atoms/BasicButton";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 1.5vh 0 0;
`;

export const MainSection = styled("main")`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Greeting = styled("h3")`
  white-space: pre;
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.938rem;
`;

export const NextButton = styled(BasicButton)`
  width: 100%;
`;

export const OptionBox = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 6.4vh auto 7.7vh;
  padding: 0 4.35%;
  gap: 10.25%;
`;

export const Option = styled("button", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  width: 11vh;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey[200]};

  ${({ isSelected, theme }) =>
    isSelected &&
    `
  border: 1px solid ${theme.palette.common.black};
  `}
`;

export const RobotDescription = styled("span")`
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0em;
  text-align: center;
  white-space: pre-wrap;
`;
