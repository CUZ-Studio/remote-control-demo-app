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
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ isMobile }) => (isMobile ? "100%" : "375px")};
  margin: 0 auto;
  padding: 60px 8px 30px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.palette.common.white};
`;
