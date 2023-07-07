import { styled } from "@mui/material/styles";

export const Box = styled("div")`
  font-family: Pretendard;
  letter-spacing: 0em;
  text-align: center;
  font-size: 11px;
  color: ${({ theme }) => theme.palette.error.main};
`;
