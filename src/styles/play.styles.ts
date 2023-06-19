import { styled } from "@mui/material/styles";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 21px 0 0;
`;

export const PlayerInfoBox = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 118px;
`;

export const PlayerName = styled("span")`
  padding: 4px 25.5px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: center;
  margin: 5px 0 32px;
`;

export const Score = styled("h1")`
  font-family: Inter;
  font-size: 48px;
  font-weight: 400;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
`;
