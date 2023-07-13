import { styled } from "@mui/material/styles";

export const StyledInput = styled("input", {
  shouldForwardProp: (props) => props !== "error",
})<{
  error: boolean;
}>`
  display: inline-block;
  padding: 14px 0;
  background-color: ${({ theme, error }) => (error ? theme.palette.error.light : "#00000050")};
  border: 1px solid #727f9a;
  border-radius: 10px;
  outline: none;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: #fff;
`;
