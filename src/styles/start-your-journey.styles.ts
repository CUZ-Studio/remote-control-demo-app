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
  color: ${({ theme }) => theme.palette.secondary.contrastText};
`;

export const Title = styled("h1")`
  text-align: left;
  margin: 0;
  text-transform: uppercase;
  font-size: 32px;
  font-weight: 900;
  font-family: "SUIT", sans-serif;
  line-height: 38px;
  letter-spacing: 0em;
`;

export const SubTitle = styled("h2")`
  text-align: left;
  margin: 0;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 800;
  font-family: "SUIT", sans-serif;
  letter-spacing: 0.05em;
`;

export const ImageWrapper = styled("div")`
  position: relative;
  left: 0;
  margin-left: -57px;
  margin-top: auto;
  z-index: -1;
  width: fit-content;
`;
