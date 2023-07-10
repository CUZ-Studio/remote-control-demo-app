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
  background: #02081e;
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 106px 30px 113px;
`;

export const CanvasWrapper = styled("div")`
  position: relative;
  aspect-ratio: 1;
  width: 110px;
  padding-right: 11px;
  border-right: 2px solid #02081e;
`;

export const PlayerInfoBox = styled("div")`
  display: grid;
  grid-template-rows: 105px;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: 70px;
  background: linear-gradient(172.94deg, #071958 5.16%, #073658 94.34%);
  border-radius: 10px;
  padding: 13px 19px;
  box-sizing: border-box;
`;

export const LiteralInfo = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9.5px;
`;

export const RewardBox = styled("div")`
  display: flex;
  gap: 2px;
`;

export const PlayerName = styled("p")`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  margin: 0;
  text-align: left;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const ScoreInfo = styled("div", {
  shouldForwardProp: (props) => props !== "isActive",
})<{
  isActive: boolean;
}>`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ isActive }) => (isActive ? "10px" : "8px")};
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
    font-family: Pretendard;
    font-size: 1rem;
    font-weight: 500;
    line-height: 35px;
    letter-spacing: 0em;
    text-align: center;
    color: #a6aec1;
  }
`;

export const Score = styled("h1", {
  shouldForwardProp: (props) => props !== "isActive",
})<{
  isActive: boolean;
}>`
  font-family: Pretendard;
  font-size: ${({ isActive }) => (isActive ? "55px" : "28px")};
  font-weight: 700;
  line-height: ${({ isActive }) => (isActive ? "35px" : "42px")};
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;
