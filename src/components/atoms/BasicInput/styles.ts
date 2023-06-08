import { styled } from "@mui/material/styles";

export const StyledInput = styled("input", {
  shouldForwardProp: (props) => props !== "error",
})<{
  error: boolean;
}>`
  display: inline-block;
  font-size: 20px;
  padding: 16px;
  background: ${({ theme, error }) =>
    error ? theme.palette.error.light : theme.palette.common.white};
  color: ${({ theme }) => theme.palette.common.black};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.palette.error.main : theme.palette.common.black)};
  outline: none;

  &:focus {
    background: ${({ theme, error }) =>
      error ? theme.palette.error.light : theme.palette.common.white};
  }
`;
