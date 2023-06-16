import { styled } from "@mui/material/styles";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 18.5px 0 0;
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

export const CanvasWrapper = styled("div")`
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  margin: 47.5px 0 36px;
`;

export const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const InputWrapper = styled("div")`
  display: flex;
  padding: 0 36px;
  margin-bottom: auto;
`;
