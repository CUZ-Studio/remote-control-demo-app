import { styled } from "@mui/material/styles";

export const Root = styled("div")`
  display: flex;
  width: 100%;
  min-height: 100vh;
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
  padding: 90px 32px 60px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.palette.common.white};
  overflow: hidden;
`;
