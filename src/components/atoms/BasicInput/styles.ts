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
  padding: 14px 0;
  margin: 0 36px;
  background-color: ${({ theme, error }) => (error ? theme.palette.error.light : "#F9F8FA")};
  color: #111111;
  border: 1px solid #aeadb0;
  border-radius: 10px;
  outline: none;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;

  &:focus {
    background-color: ${({ theme, error }) => (error ? theme.palette.error.light : "#F9F8FA")};
  }
`;
