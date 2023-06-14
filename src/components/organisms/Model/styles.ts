import { styled } from "@mui/material/styles";

export const ColorPalette = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 48px);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 8px;
  margin: 0 auto;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
`;
