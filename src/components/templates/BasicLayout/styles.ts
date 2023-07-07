import { styled } from "@mui/material/styles";

export const Root = styled("div", {
  shouldForwardProp: (props) => props !== "windowHeight",
})<{
  windowHeight?: number;
}>`
  display: flex;
  width: 100%;
  min-height: ${({ windowHeight }) => (windowHeight ? `${windowHeight}px` : "100%")};
  background-color: ${({ theme }) => theme.palette.common.black};
`;
