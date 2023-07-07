import { styled } from "@mui/material/styles";

export const Panel = styled("section")`
  position: relative;
  width: 100%;
  aspect-ratio: 390 / 343;
  padding: 43px 20px 50px;
`;

export const JumpButton = styled("div")`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
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
  cursor: pointer;
`;

export const FireButton = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 110px;
  height: 110px;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey[600]};
  z-index: 9;
  cursor: pointer;
`;
