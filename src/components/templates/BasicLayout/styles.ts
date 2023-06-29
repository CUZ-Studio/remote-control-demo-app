import { styled } from "@mui/material/styles";

export const Root = styled("div", {
  shouldForwardProp: (props) => props !== "windowHeight",
})<{
  windowHeight?: number;
}>`
  display: flex;
  width: 100%;
  height: ${({ windowHeight }) => (windowHeight ? `${windowHeight}px` : "100%")};
  background-color: ${({ theme }) => theme.palette.common.black};
`;

export const Inner = styled("div", {
  shouldForwardProp: (props) => props !== "isMobile",
})<{
  isMobile: boolean;
}>`
  position: relative;
  display: flex;
  width: ${({ isMobile }) => (isMobile ? "100%" : "425px")};
  margin: 0 auto;
  padding: 10.5vh 32px 7vh;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.palette.common.white};
  overflow: hidden;
`;
