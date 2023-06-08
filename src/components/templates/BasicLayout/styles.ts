import { styled } from "@mui/material/styles";

export const Root = styled("div")`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.common.black};
`;

export const Inner = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 425px;
  margin: 0 auto;
  padding: 80px 0;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.palette.common.white};
`;
