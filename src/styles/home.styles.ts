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
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 3;
  padding: 7.938rem 1.25rem 2.5rem;
`;

export const TitleSection = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled("h1")`
  font-family: Racing Sans One;
  font-size: 49px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: center;
  width: 100%;
  line-height: 1;
  margin: 0;
  white-space: nowrap;
  text-transform: uppercase;
  text-shadow: 0px 0px 31.15px #95fff94d, 0px 0px 2.07px #f5ffcc40;
  background: -webkit-linear-gradient(
      180deg,
      rgba(157, 179, 255, 0.5) 0%,
      rgba(157, 214, 255, 0.5) 100%
    ),
    linear-gradient(0deg, #ffffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SubTitleWrapper = styled("div")`
  display: flex;
`;

export const Colon = styled("h2")`
  font-family: Racing Sans One;
  font-size: 25px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  margin: -2px 0 0 0;
  white-space: nowrap;
  background: -webkit-linear-gradient(
      180deg,
      rgba(157, 179, 255, 0.5) 0%,
      rgba(157, 214, 255, 0.5) 100%
    ),
    -webkit-linear-gradient(0deg, #ffffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 31.15px #95fff94d, 0px 0px 2.07px #f5ffcc40;
`;

export const SubTitle = styled("h2")`
  font-family: Racing Sans One;
  font-size: 25px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  white-space: nowrap;
  text-transform: uppercase;
  text-align: center;
  background: -webkit-linear-gradient(
      180deg,
      rgba(157, 179, 255, 0.5) 0%,
      rgba(157, 214, 255, 0.5) 100%
    ),
    -webkit-linear-gradient(0deg, #ffffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 31.15px #95fff94d, 0px 0px 2.07px #f5ffcc40;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: auto;
`;

export const StartButton = styled(BasicButton)`
  position: relative;
  width: 100%;
`;
