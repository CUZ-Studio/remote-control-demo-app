import { styled } from "@mui/material/styles";

import BasicButton from "@/components/atoms/BasicButton";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const MainSection = styled("main")`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TitleWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 0;
`;

export const Title = styled("h1")`
  font-size: 36px;
  font-weight: 400;
  line-height: 35px;
  margin: 0;
  white-space: nowrap;
`;

export const SubTitle = styled("h2")`
  font-size: 20px;
  font-weight: 400;
  line-height: 35px;
  margin: 0;
  white-space: nowrap;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 77px;
  width: 100%;
`;

export const StartButton = styled(BasicButton)`
  position: relative;
  width: 100%;
`;

export const Logo = styled("span")`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: center;
`;
