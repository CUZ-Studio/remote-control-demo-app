import { styled } from "@mui/material/styles";

import { RobotColor } from "@/types";

export const ColorPalette = styled("div")`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 81px);
  grid-template-rows: repeat(2, 81px);
  grid-row-gap: 11px;
  grid-column-gap: 15px;
  margin: 22px auto 78px;
  z-index: 99;
`;

export const ColorOption = styled("div", {
  shouldForwardProp: (props) => props !== "color" && props !== "isSelected",
})<{
  color: RobotColor;
  isSelected: boolean;
}>`
  width: 81px;
  height: 81px;
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
  outline: 1px solid
    ${({ isSelected, theme }) => (isSelected ? theme.palette.secondary.contrastText : "none")};
  outline-offset: 4px;
  cursor: pointer;
`;
