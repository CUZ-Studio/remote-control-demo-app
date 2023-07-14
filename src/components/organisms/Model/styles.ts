import { styled } from "@mui/material/styles";

import { RobotColor } from "@/types";

export const ColorPalette = styled("div")`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 93px);
  grid-template-rows: repeat(2, 93px);
  grid-row-gap: 0;
  grid-column-gap: 3px;
  margin: 0 auto 78px;
  z-index: 9;
`;

export const ColorOption = styled("div", {
  shouldForwardProp: (props) => props !== "color" && props !== "isSelected",
})<{
  color: RobotColor;
  isSelected: boolean;
}>`
  width: 73px;
  height: 73px;
  background-color: ${({ color }) => {
    switch (color) {
      case RobotColor.YELLOW:
        return "#FFD74A";
      case RobotColor.BLUE:
        return "#5D9BEC";
      case RobotColor.WHITE:
        return "#F6F7FB";
      case RobotColor.GREEN:
        return "#7DBE65";
      case RobotColor.BLACK:
        return "#434A54";
      case RobotColor.RED:
        return "#E9573E";
      default:
        break;
    }
  }};
  border-radius: 10px;
  border: 2px solid
    ${({ color }) => {
      switch (color) {
        case RobotColor.YELLOW:
          return "#DFAD4D";
        case RobotColor.BLUE:
          return "#3A72BC";
        case RobotColor.WHITE:
          return "#BDC1CF";
        case RobotColor.GREEN:
          return "#659854";
        case RobotColor.BLACK:
          return "#22262B";
        case RobotColor.RED:
          return "#B74733";
        default:
          break;
      }
    }};
  cursor: pointer;
`;

export const Outline = styled("div", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  position: relative;
  width: 93px;
  height: 93px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ isSelected }) => (isSelected ? "#03070e50" : "none")};
  border-radius: 17px;
  box-shadow: ${({ isSelected }) =>
    isSelected ? "0px 0px 20px 0px #67a4ff4d, 0px 0px 7px 0px #3549ffb2" : "none"};

  &::before {
    display: ${({ isSelected }) => (isSelected ? "block" : "none")};
    width: 100%;
    height: inherit;
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    padding: 2px;
    border-radius: 17px;
    background: linear-gradient(180deg, #8dadff 0%, #789eff 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;
