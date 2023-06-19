import { styled } from "@mui/material/styles";

export const ColorPalette = styled("div")`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 17px;
  grid-column-gap: 49px;
  grid-column-gap: auto;
  margin: 38px auto 0;
  z-index: 99;
`;
