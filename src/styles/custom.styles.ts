import { styled } from "@mui/material/styles";

import BasicButton from "@/components/atoms/BasicButton";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 3.6vh 0 0;
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

export const CanvasWrapper = styled("div")`
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  margin-top: 7.1vh;
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
