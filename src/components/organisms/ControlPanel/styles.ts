import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";
import { css, styled } from "@mui/material/styles";

export const Panel = styled("section")`
  position: relative;
  width: 100%;
  aspect-ratio: 3;
  border: 1px solid ${({ theme }) => theme.palette.common.black};
  border-radius: 4px;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 8px;
`;

const Icon = css`
  font-size: 32px;
`;

export const ForwardIcon = styled(ForwardRoundedIcon)`
  ${Icon}
  rotate: 0deg;
`;

export const BackwardIcon = styled(ForwardRoundedIcon)`
  ${Icon}
  rotate: 180deg;
`;

export const ForwardButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
`;

export const BackwardButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
`;

export const ControlButton = styled("button")`
  aspect-ratio: 1;
  margin: auto 0;
  cursor: pointer;
`;
