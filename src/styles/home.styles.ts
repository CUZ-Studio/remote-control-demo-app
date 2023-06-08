import { styled } from "@mui/material/styles";

export const Container = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 8px;
  width: 100%;
`;

export const StyledForm = styled("form")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 16px;
`;
