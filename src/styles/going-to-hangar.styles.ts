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
  align-items: center;
  justify-content: center;
`;

export const MessageBox = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const LoadingMessage = styled("p")`
  white-space: pre-wrap;
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 600;
  line-height: 39px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const Waiting = styled("div")`
  display: flex;
  align-items: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 300;
  line-height: 21px;
  letter-spacing: 0.1em;
  text-align: center;
  color: #c7ddff;

  p:nth-of-type(2) {
    text-transform: uppercase;
    margin: 0 1.125rem;
  }
`;
