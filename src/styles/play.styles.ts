import { styled } from "@mui/material/styles";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

export const PlayerInfoBox = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }

  p {
    font-size: 12px;
    margin: 0;
  }
`;

export const StyledForm = styled("form")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 16px;
`;
