import { styled } from "@mui/material/styles";

export const Container = styled("div", {
  shouldForwardProp: (props) => props !== "isMobile",
})<{
  isMobile: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ isMobile }) => (isMobile ? "100%" : "425px")};
  margin: 0 auto;
  box-sizing: border-box;
  background: linear-gradient(172.95deg, #071958 3.01%, #073658 40.35%);
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 106px 0 0;
`;

export const PlayerInfoBox = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 118px;
`;

export const RewardBox = styled("div")`
  display: flex;
  gap: 2px;
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
