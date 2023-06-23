import { styled } from "@mui/material/styles";

export const ColorPalette = styled("div")`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 1rem;
  grid-column-gap: 5.8vh;
  margin: 4.5vh auto 3vh;
  z-index: 99;
`;
