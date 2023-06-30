import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { styled } from "@mui/material/styles";

export const Root = styled("header", {
  shouldForwardProp: (props) => props !== "isVisible" && props !== "showUserOnHeader",
})<{
  isVisible: boolean;
  showUserOnHeader: boolean;
}>`
  position: fixed;
  z-index: 9;
  width: 100%;
  height: ${({ showUserOnHeader }) => (showUserOnHeader ? "11.7vh" : "10.5vh")};
  z-index: 9;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
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
  padding: 3vh 16px;
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
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImage = styled("div")`
  width: 47px;
  aspect-ratio: 1;
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

export const IconWrapper = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
`;
