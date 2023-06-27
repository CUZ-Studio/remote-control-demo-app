import { styled } from "@mui/material/styles";

export const SectionNumber = styled("h2", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  font-family: Inter;
  font-size: ${({ isSelected }) => (isSelected ? "32px" : "24px")};
  font-weight: 400;
  line-height: 39px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => theme.palette.common.white};
  margin: 0 0 ${({ isSelected }) => (isSelected ? "22px" : "5px")};
`;

export const Title = styled("h1", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  font-family: Inter;
  font-weight: 400;
  font-size: ${({ isSelected }) => (isSelected ? "24px" : "16px")};
  line-height: ${({ isSelected }) => (isSelected ? "29px" : "19.6px")};
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
`;

export const SubTitle = styled("h3", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.6px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
  white-space: pre-wrap;
`;

export const Card = styled("div", {
  shouldForwardProp: (props) => props !== "isSelected" && props !== "order",
})<{
  isSelected: boolean;
  order?: "top" | "middle" | "bottom";
}>`
  position: relative;
  width: ${({ order }) => {
    switch (order) {
      case "middle":
        return "279px";
      case "top":
      case "bottom":
      default:
        return "202px";
    }
  }};
  height: ${({ order }) => {
    switch (order) {
      case "middle":
        return "279px";
      case "top":
      case "bottom":
      default:
        return "202px";
    }
  }};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.grey[200] : theme.palette.grey[100]};
  padding: 36px 34px;
  display: flex;
  flex-direction: column;
  border-radius: ${({ order }) => {
    switch (order) {
      case "middle":
        return "39px";
      case "top":
      case "bottom":
      default:
        return "29px";
    }
  }};
  cursor: pointer;
  z-index: ${({ isSelected }) => (isSelected ? 3 : 2)};
  rotate: ${({ order }) => {
    switch (order) {
      case "top":
        return "15deg";
      case "bottom":
        return "-15deg";
      default:
        break;
    }
  }};
  transform: ${({ order }) => {
    switch (order) {
      case "middle":
        return "translate(30%, 0)";
      case "top":
        return "translate(90%, 5%)";
      case "bottom":
      default:
        return "translate(90%, -5%)";
    }
  }};
  user-select: none;
`;

export const EnterButton = styled("button", {
  shouldForwardProp: (props) => props !== "isPressed",
})<{
  isPressed: boolean;
}>`
  padding: 8px 13px;
  border: none;
  background-color: ${({ theme, isPressed }) =>
    isPressed ? theme.palette.secondary.main : theme.palette.grey[300]};
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: auto;
  width: fit-content;
  cursor: pointer;
`;
