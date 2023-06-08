import { styled } from "@mui/material/styles";

export const Box = styled("div")`
  font-size: 13px;
  color: ${({ theme }) => theme.palette.error.main};
`;
