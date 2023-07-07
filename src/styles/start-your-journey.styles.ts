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
  padding: 155px 20px 10px;
`;

export const TitleWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const Title = styled("h1")`
  text-align: left;
  margin: 0;
  text-transform: uppercase;
  font-family: Anton;
  font-size: 43px;
  font-weight: 400;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: left;
`;

export const SubTitle = styled("h2")`
  text-align: left;
  margin: 0;
  font-family: Pretendard;
  font-size: 19px;
  font-weight: 800;
  line-height: 26px;
  letter-spacing: 0.1em;
  text-align: left;
`;

export const ImageWrapper = styled("div")`
  position: relative;
  left: 0;
  margin-left: -57px;
  margin-top: auto;
  z-index: -1;
  width: fit-content;
`;
