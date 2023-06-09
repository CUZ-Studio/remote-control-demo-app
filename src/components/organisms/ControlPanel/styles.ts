import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";
import { css, styled } from "@mui/material/styles";

export const Panel = styled("section")`
  position: relative;
  width: 50%;
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.palette.common.black};
  border-radius: 4px;
`;

const Icon = css`
  font-size: 32px;
`;

export const ForwardIcon = styled(ForwardRoundedIcon)`
  ${Icon}
  rotate: -90deg;
`;

export const BackwardIcon = styled(ForwardRoundedIcon)`
  ${Icon}
  rotate: 90deg;
`;

export const ForwardButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  left: 50%;
  top: 8px;
  margin-left: -24px;
  position: absolute;
`;

export const BackwardButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  left: 50%;
  margin-left: -24px;
  position: absolute;
  bottom: 8px;
`;
