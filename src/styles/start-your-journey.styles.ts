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
  background-color: ${({ theme }) => theme.palette.background.paper};
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 9.688rem 1.25rem 0.625rem;
`;

export const TitleWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.188rem;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const Title = styled("h1")`
  text-align: left;
  margin: 0;
  text-transform: uppercase;
  font-family: Anton;
  font-size: 2.688rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.07em;
`;

export const SubTitle = styled("h2")`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.188rem;
  font-weight: 800;
  line-height: 1.36;
  letter-spacing: 0.2em;
  text-align: left;
`;

export const ImageWrapper = styled("div")`
  position: relative;
  left: 0;
  margin-left: -15.66%;
  margin-top: auto;
  z-index: -1;
  width: fit-content;
`;
