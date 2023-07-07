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
  width: 283px;
  padding: 0 25px;
  margin: 0 auto;
`;

export const StyledForm = styled("form")`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  align-items: center;
  justify-content: space-between;
  width: inherit;
  margin-top: 63px;
`;

export const CardPopUp = styled("div")`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 77.25vh;
  bottom: 0;
  background: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 40px 40px 0 0;
  padding: 31px 20px 34px;
`;

export const InputWrapper = styled("div")`
  display: flex;
  margin-bottom: auto;
`;

export const PlayButton = styled("button")`
  height: fit-content;
  border: none;
  width: 100%;
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
