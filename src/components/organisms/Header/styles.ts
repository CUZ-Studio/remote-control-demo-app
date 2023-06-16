import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { styled } from "@mui/material/styles";

export const Root = styled("header")`
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 100px;
  z-index: 9;
`;

export const Inner = styled("div", {
  shouldForwardProp: (props) => props !== "isMobile",
})<{
  isMobile: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ isMobile }) => (isMobile ? "100%" : "425px")};
  height: 100%;
  padding: 26px 15px;
  margin: 0 auto;
  background: ${({ theme }) => theme.palette.common.white};
`;

export const LogoutIcon = styled(ExitToAppRoundedIcon)`
  font-size: 20px;
  cursor: pointer;
`;
