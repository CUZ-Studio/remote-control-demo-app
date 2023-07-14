import { styled } from "@mui/material/styles";

export const Container = styled("div", {
  shouldForwardProp: (props) => props !== "isMobile" && props !== "selectedSection",
})<{
  isMobile: boolean;
  selectedSection: number;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ isMobile }) => (isMobile ? "100%" : "425px")};
  margin: 0 auto;
  box-sizing: border-box;
  background-image: ${({ selectedSection }) =>
    `url("/assets/images/startYourJourney/${selectedSection}_backgroundImage.png")`};
  background-size: contain;
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 127px 40px 60px;
`;

export const Title = styled("h1", {
  shouldForwardProp: (props) => props !== "chapterNumber",
})<{
  chapterNumber: number;
}>`
  font-family: Racing Sans One;
  font-size: 49px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: center;
  width: 100%;
  line-height: 1;
  margin: 0;
  white-space: nowrap;
  text-transform: uppercase;
  text-shadow: 0px 0px 31.15px #95fff94d, 0px 0px 2.07px #f5ffcc40;
  background: ${({ chapterNumber }) => {
    switch (chapterNumber) {
      case 2:
        return "-webkit-linear-gradient(180deg, rgba(168, 251, 241, 0.5) 0%, rgba(175, 222, 255, 0.5) 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF)";
      case 4:
        return "-webkit-linear-gradient(180deg, rgba(209, 192, 255, 0.8) 0%, rgba(180, 210, 255, 0.8) 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF)";
      case 3:
      default:
        return "-webkit-linear-gradient(180deg, rgba(157, 179, 255, 0.5) 0%, rgba(157, 214, 255, 0.5) 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF)";
    }
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ImageWrapper = styled("div")`
  position: relative;
  margin-top: 21px;
  width: 310px;
  aspect-ratio: 1;
`;

export const ChapterList = styled("ul")`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;
  padding: 0;
  gap: 15px;
`;

export const ChapterCard = styled("li", {
  shouldForwardProp: (props) => props !== "isSelected" && props !== "chapterNumber",
})<{
  isSelected: boolean;
  chapterNumber: number;
}>`
  position: relative;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto 1fr;
  align-items: ${({ isSelected }) => (isSelected ? "flex-start" : "center")};
  grid-column-gap: ${({ chapterNumber, isSelected }) => {
    switch (chapterNumber) {
      case 2:
        return "42px";
      case 4:
        return isSelected ? "41px" : "16.78px";
      case 3:
      default:
        return isSelected ? "39px" : "26px";
    }
  }};
  padding: ${({ isSelected }) =>
    isSelected ? "13px 36px 25px 33px" : "8.7px 28.75px 10.3px 31px"};
  margin: ${({ isSelected }) => (isSelected ? "0" : "0 9px")};

  background: -webkit-linear-gradient(
      180deg,
      rgba(157, 179, 255, 0.5) 0%,
      rgba(157, 214, 255, 0.5) 100%
    ),
    -webkit-linear-gradient(0deg, #fff, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  list-style: none;
  cursor: pointer;

  border: none;
  border-radius: ${({ isSelected }) => (isSelected ? "24px" : "31px")};

  box-shadow: ${({ chapterNumber, isSelected }) => {
    if (!isSelected) return "none";
    switch (chapterNumber) {
      case 2:
        return "0px 0px 14px 0px #FDFF954D, 0px 4px 10px 0px #00000040";
      case 4:
        return "0px 0px 14px 0px #39A0FF4D, 0px 4px 10px 0px #00000040";
      case 3:
      default:
        return "0px 0px 14px 0px #39A0FF4D, 0px 4px 10px 0px #00000040";
    }
  }};

  -moz-transition: all 300ms ease-out;
  -webkit-transition: all 300ms ease-out;
  -o-transition: all 300ms ease-out;
  transition: all 300ms ease-out;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent; // remove blue box when clicking on elem
  touch-action: none;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    padding: 1px;
    border-radius: ${({ isSelected }) => (isSelected ? "24px" : "31px")};
    background: ${({ isSelected, chapterNumber }) => {
      if (!isSelected) return "#727F9A";
      switch (chapterNumber) {
        case 2:
          return "linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(180deg, #59C8BC 0%, #50D5FF 100%)";
        case 4:
          return "linear-gradient(180deg, #8D99FF 0%, #7E8BFF 100%)";
        case 3:
        default:
          return "linear-gradient(180deg, #9dd6ff 0%, #9db3ff 100%)";
      }
    }};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

export const BlackPaper = styled("div", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000020;
  z-index: ${({ isSelected }) => (isSelected ? -1 : 2)};
`;

export const ChapterNumber = styled("h3", {
  shouldForwardProp: (props) => props !== "isSelected" && props !== "chapterNumber",
})<{
  isSelected: boolean;
  chapterNumber: number;
}>`
  font-family: Racing Sans One;
  font-size: ${({ isSelected }) => (isSelected ? "32px" : "24px")};
  font-weight: 400;
  letter-spacing: 0em;
  text-align: center;
  width: 100%;
  line-height: ${({ isSelected }) => (isSelected ? "40.32px" : "30.24px")};
  margin: 0;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${({ chapterNumber, isSelected }) => {
    if (!isSelected) return "#727f9a";
    switch (chapterNumber) {
      case 2:
        return "-webkit-linear-gradient(180deg, rgba(0, 229, 201, 0.7) 0%, rgba(13, 170, 152, 0.7) 16.15%, rgba(0, 171, 209, 0.7) 100%), -webkit-linear-gradient(0deg, #FFFFFF, #FFFFFF)";
      case 4:
        return "-webkit-linear-gradient(180deg, rgba(111, 61, 255, 0.7) 0%, rgba(66, 73, 255, 0.7) 100%), -webkit-linear-gradient(0deg, #FFFFFF, #FFFFFF)";
      case 3:
      default:
        return "linear-gradient(180deg, #3965FF 25%, #5C8AFF 82.5%), linear-gradient(151.82deg, #9DB3FF 16.19%, #9DD6FF 113.04%)";
    }
  }};

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ChapterInfo = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

export const TitleWrapper = styled("div", {
  shouldForwardProp: (props) => props !== "isSelected" && props !== "chapterNumber",
})<{
  isSelected: boolean;
  chapterNumber: number;
}>`
  display: flex;
  flex-direction: ${({ isSelected, chapterNumber }) => {
    switch (chapterNumber) {
      case 2: {
        return isSelected ? "column" : "row";
      }
      case 4: {
        return isSelected ? "column" : "row";
      }
      case 3:
      default: {
        return "column";
      }
    }
  }};
  align-items: flex-start;
  margin-top: 1.38px;
  gap: ${({ isSelected, chapterNumber }) => {
    switch (chapterNumber) {
      case 2: {
        return isSelected ? "6px" : "0";
      }
      case 4: {
        return isSelected ? "6px" : "0";
      }
      case 3:
      default: {
        return "6px";
      }
    }
  }};
`;

export const ChapterTitle = styled("h4", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#727F9A")};
  font-family: Pretendard;
  font-size: ${({ isSelected }) => (isSelected ? "17px" : "15px")};
  font-weight: 600;
  line-height: ${({ isSelected }) => (isSelected ? "23px" : "20.25px")};
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
  white-space: nowrap;
`;

export const ChapterSubTitle = styled("h4", {
  shouldForwardProp: (props) => props !== "isSelected" && props !== "chapterNumber",
})<{
  isSelected: boolean;
  chapterNumber: number;
}>`
  color: ${({ isSelected }) => (isSelected ? "#FFFFFF70" : "#727F9A")};
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  margin: auto 0;
  white-space: nowrap;
  padding-left: ${({ isSelected, chapterNumber }) => {
    switch (chapterNumber) {
      case 2: {
        return isSelected ? "0" : "4.5px";
      }
      case 4: {
        return isSelected ? "0" : "4.5px";
      }
      case 3:
      default: {
        return "0";
      }
    }
  }};
`;

export const EnterButton = styled("button", {
  shouldForwardProp: (props) => props !== "chapterNumber" && props !== "isSelected",
})<{
  isSelected: boolean;
  chapterNumber: number;
}>`
  position: relative;
  display: ${({ isSelected }) => (isSelected ? "block" : "none")};
  border-radius: 24px;
  padding: 7px 0;
  margin: 0 3px;
  width: 120px;
  border: none;
  outline: none;
  background: ${({ chapterNumber }) => {
    switch (chapterNumber) {
      case 2:
        return "linear-gradient(180deg, rgba(6, 155, 138, 0.8) 0%, rgba(0, 134, 164, 0.8) 100%), linear-gradient(0deg, #ffffff, #ffffff)";
      case 4:
        return "linear-gradient(180deg, rgba(111, 61, 255, 0.9) 0%, rgba(66, 73, 255, 0.9) 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF)";
      case 3:
      default:
        return "linear-gradient(180deg, #3965FF 0%, #5C8AFF 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF)";
    }
  }};
  -webkit-text-fill-color: #ffffff;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  cursor: pointer;
`;
