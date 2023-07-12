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
  z-index: 9;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;

export const Inner = styled("div", {
  shouldForwardProp: (props) => props !== "isMobile" && props !== "showUserOnHeader",
})<{
  isMobile: boolean;
  showUserOnHeader: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ isMobile }) => (isMobile ? "100%" : "425px")};
  height: 100%;
  padding: ${({ showUserOnHeader }) => (showUserOnHeader ? "10px 9px" : "31px 20px")};
  margin: 0 auto;
  background-color: transparent;
`;

export const ProfileBox = styled("div")`
  display: flex;
  align-items: center;
  user-select: none;
`;

export const ProfileImageWrapper = styled("div")`
  width: 65px;
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

export const ArrowBackIcon = styled("div")`
  display: flex;
  cursor: pointer;
`;

export const QuestionMarkIcon = styled("div")`
  display: flex;
  cursor: pointer;
`;

export const IconWrapper = styled("div")`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 0.25rem;
`;

export const Welcome = styled("p")`
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: center;
  color: #009ecf;
  text-transform: uppercase;
`;

export const Indicator = styled("div")`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 0.5rem);
  grid-column-gap: 0.5rem;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const Dot = styled("div", {
  shouldForwardProp: (props) => props !== "isActive",
})<{
  isActive: boolean;
}>`
  scale: ${({ isActive }) => (isActive ? 8 / 6 : 1)};
  width: 6px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#009ECF" : "#A6AEC1")};
  cursor: pointer;
  position: relative;
`;
