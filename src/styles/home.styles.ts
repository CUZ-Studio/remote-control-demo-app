import { styled } from "@mui/material/styles";

import BasicButton from "@/components/atoms/BasicButton";

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
  background-color: ${({ theme }) => theme.palette.primary.main};
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 3;
  background: linear-gradient(167.88deg, rgba(0, 0, 0, 0.6) -7.02%, rgba(0, 0, 0, 0) 98.6%);
  padding: 0 1.25rem 2.5rem;
`;

export const TitleWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  gap: 0.5rem;
`;

export const Title = styled("h1")`
  font-family: "Anton", sans-serif;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 3.188rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.07em;
  text-align: center;
  margin: 0;
  white-space: nowrap;
  text-transform: uppercase;
`;

export const SubTitle = styled("h2")`
  font-family: "Pretendard";
  color: ${({ theme }) => theme.palette.primary.contrastText};
  margin: 0;
  white-space: nowrap;
  font-size: 1.188rem;
  font-weight: 800;
  line-height: 1.36;
  letter-spacing: 0.2em;
  text-align: center;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StartButton = styled(BasicButton)`
  position: relative;
  width: 100%;
`;
