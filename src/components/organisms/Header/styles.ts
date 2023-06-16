import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { styled } from "@mui/material/styles";

export const Root = styled("header", {
  shouldForwardProp: (props) => props !== "showUserOnHeader",
})<{
  showUserOnHeader: boolean;
}>`
  position: fixed;
  z-index: 9;
  width: 100%;
  height: ${({ showUserOnHeader }) => (showUserOnHeader ? "99px" : "90px")};
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

export const ProfileBox = styled("div")`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const ProfileImageWrapper = styled("div")`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImage = styled("div")`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;

export const UserName = styled("p")`
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ArrowBackIcon = styled("div")`
  display: flex;
  margin-left: 19px;
  cursor: pointer;
`;

export const QuestionMarkIcon = styled("div")`
  display: flex;
  cursor: pointer;
`;
