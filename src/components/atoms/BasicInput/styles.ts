import { styled } from "@mui/material/styles";

export const StyledInput = styled("input")`
  display: inline-block;
  font-size: 20px;
  padding: 16px;
  background: ${({ theme }) => theme.palette.common.white};
  color: ${({ theme }) => theme.palette.common.black};
  border: 1px solid ${({ theme }) => theme.palette.common.black};
`;
