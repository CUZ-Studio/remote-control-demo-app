import { styled } from "@mui/material/styles";

export const Panel = styled("section")`
  position: relative;
  width: 295px;
  height: 192px;
  padding: 0 21px;
`;

export const JumpButton = styled("div")`
  position: absolute;
  left: 50%;
  margin-left: -24px;
  cursor: pointer;
  rotate: 90deg;
`;

export const MoveLeftButton = styled("div")`
  position: absolute;
  left: 0;
  bottom: 0;
  cursor: pointer;
`;

export const MoveRightButton = styled("div")`
  position: absolute;
  right: 0;
  bottom: 0;
  rotate: 180deg;
  cursor: pointer;
`;

export const FireButton = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 72px;
  height: 72px;
  bottom: 9px;
  left: 50%;
  margin-left: -36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey[600]};
  z-index: 9;
  cursor: pointer;
`;
