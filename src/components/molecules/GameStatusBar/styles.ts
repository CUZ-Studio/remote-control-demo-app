import { styled } from "@mui/material/styles";

export const StatusBar = styled("div", {
  shouldForwardProp: (props) => props !== "isActive",
})<{
  isActive: boolean;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  width: 100%;
  bottom: 45px;
  z-index: 9;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.palette.secondary.main : theme.palette.grey[500]};
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: center;
`;
