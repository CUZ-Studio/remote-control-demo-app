import { styled } from "@mui/material/styles";

export const SectionNumber = styled("h2", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  font-family: "Pretendard";
  font-size: ${({ isSelected }) => (isSelected ? "30px" : "26px")};
  font-weight: 600;
  line-height: ${({ isSelected }) => (isSelected ? "36px" : "31px")};
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.info.main : theme.palette.info.light};
  margin: 0 0 7px 0;
`;

export const Title = styled("h1", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${({ isSelected }) => (isSelected ? "24px" : "18px")};
  line-height: ${({ isSelected }) => (isSelected ? "29px" : "21.48px")};
  letter-spacing: 0em;
  text-align: left;
  margin: 0 0 7px 0;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  white-space: pre-wrap;
`;

export const SubTitle = styled("h3", {
  shouldForwardProp: (props) => props !== "isSelected",
})<{
  isSelected: boolean;
}>`
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.1875;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.palette.primary.contrastText}80;
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
        return "280px";
      case "top":
      case "bottom":
      default:
        return "200px";
    }
  }};
  height: ${({ order }) => {
    switch (order) {
      case "middle":
        return "280px";
      case "top":
      case "bottom":
      default:
        return "202px";
    }
  }};
  background: ${({ isSelected }) =>
    isSelected ? `linear-gradient(180deg, #071958 0%, #073658 100%)` : "#475373"};
  padding: 38px 36px 45px;
  display: flex;
  flex-direction: column;
  border-radius: ${({ order }) => {
    switch (order) {
      case "middle":
        return "30px";
      case "top":
      case "bottom":
      default:
        return "20px";
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
        return "translate(85%, 0%)";
      case "bottom":
      default:
        return "translate(85%, 0%)";
    }
  }};
  right: -122.5px;
  user-select: none;
  box-shadow: ${({ theme }) => `0px 2px 15px 0px ${theme.palette.secondary.contrastText}33`};
  opacity: ${({ order }) => {
    switch (order) {
      case "top":
      case "bottom":
        return "60%";
      case "middle":
      default:
        return "100%";
    }
  }};
`;

export const EnterButton = styled("button", {
  shouldForwardProp: (props) => props !== "isPressed",
})<{
  isPressed: boolean;
}>`
  padding: 6px 20px;
  border: none;
  border-radius: 1rem;
  background-color: ${({ theme, isPressed }) =>
    isPressed ? theme.palette.primary.main : theme.palette.secondary.main};
  margin-top: auto;
  width: fit-content;
  cursor: pointer;
  color: ${({ theme, isPressed }) =>
    isPressed ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText};
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`;
