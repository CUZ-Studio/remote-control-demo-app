import { styled } from "@mui/material/styles";

export const Container = styled("div")`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 100px;
`;

export const TitleWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  margin-left: -15px;
  margin-bottom: 89px;
`;

export const Title = styled("h1")`
  font-family: Inter;
  font-size: 36px;
  font-weight: 400;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
`;

export const SubTitle = styled("h2")`
  font-family: Inter;
  font-size: 20px;
  font-weight: 400;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
`;

export const ImageWrapper = styled("div")`
  position: relative;
  left: 0;
  margin-left: -32px;
  z-index: 4;
  width: fit-content;
`;

export const PlaceholderImage = styled("div")`
  width: 200px;
  height: 373px;
  background: ${({ theme }) => theme.palette.grey[400]};
`;
