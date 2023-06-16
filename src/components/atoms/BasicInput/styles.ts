import { styled } from "@mui/material/styles";

export const StyledInput = styled("input", {
  shouldForwardProp: (props) => props !== "error",
})<{
  error: boolean;
}>`
  display: inline-block;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  width: 100%;
  padding: 16.5px 0;
  background-color: ${({ theme, error }) =>
    error ? theme.palette.error.light : theme.palette.grey[200]};
  color: ${({ theme }) => theme.palette.common.black};
  border: none;
  outline: none;
  text-align: center;

  &:focus {
    background-color: ${({ theme, error }) =>
      error ? theme.palette.error.light : theme.palette.grey[200]};
  }
`;
