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
  background: linear-gradient(360deg, #141828 67.71%, rgba(20, 24, 40, 0) 100%);
  overflow: hidden;
  z-index: 1;
`;

export const Inner = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 30px;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

export const Hint = styled("p")`
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: center;
  color: linear-gradient(0deg, rgba(157, 182, 219, 0.5), rgba(157, 182, 219, 0.5)),
    linear-gradient(0deg, #ffffff, #ffffff);
  margin: 0 0 40px 0;
`;

export const Wrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 30px;
  grid-row-gap: 25px;
`;

export const PinNumbers = styled("div")`
  display: flex;
  gap: 15px;
`;

export const Option = styled("button", {
  shouldForwardProp: (props) => props !== "isError",
})<{
  isError: boolean;
}>`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #727f9a;
  background: #141829;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 600;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0;
  outline: none;
  color: ${({ isError }) => (isError ? "#DF8585" : "#ffffff")};
  cursor: pointer;
`;

export const Message = styled("p", {
  shouldForwardProp: (props) => props !== "isError",
})<{
  isError: boolean;
}>`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 21.6px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ isError }) => (isError ? "#df8585" : "#85DFA9")};
  margin: 0;
`;
