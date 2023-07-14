import { styled } from "@mui/material/styles";

import { HeaderType } from "@/types";

export const Root = styled("header", {
  shouldForwardProp: (props) => props !== "isVisible",
})<{
  isVisible: boolean;
}>`
  position: fixed;
  width: 100%;
  z-index: 9;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;

export const Inner = styled("div", {
  shouldForwardProp: (props) => props !== "isMobile" && props !== "headerType",
})<{
  isMobile: boolean;
  headerType: HeaderType;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ isMobile }) => (isMobile ? "100%" : "425px")};
  height: 100%;
  padding: ${({ headerType }) => {
    switch (headerType) {
      case HeaderType.WITH_LOGOUT:
        return "41px 20px 0 9px";
      case HeaderType.WITH_PROFILE:
      default:
        return "57px 20px 0";
    }
  }};
  margin: 0 auto;
  background-color: transparent;
`;

export const LogoImageWrapper = styled("div")`
  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;

  svg {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent; // remove blue box when clicking on elem
    touch-action: none;
  }
`;

export const ProfileImageWrapper = styled("div")`
  width: 40px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
`;

export const ArrowBackIcon = styled("div")`
  display: flex;
  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent; // remove blue box when clicking on elem
  touch-action: none;
`;

export const QuestionMarkIcon = styled("div")`
  display: flex;
  cursor: pointer;
`;

export const IconWrapper = styled("div")`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Welcome = styled("p")`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: center;
  color: #4b73ff;
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
  background-color: ${({ isActive }) => (isActive ? "#4B73FF" : "#A6AEC1")};
  cursor: pointer;
  position: relative;
`;
