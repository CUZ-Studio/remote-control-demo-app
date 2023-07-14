import { styled } from "@mui/material/styles";

export const Paper = styled("div", {
  shouldForwardProp: (props) => props !== "isGameInProgress",
})<{
  isGameInProgress: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #02081eb2;
  z-index: 2;
  top: 0;
  left: 0;
  display: ${({ isGameInProgress }) => (isGameInProgress ? "none" : "block")};
`;

export const Panel = styled("section")`
  position: relative;
  width: 100%;
  aspect-ratio: 1.35;
  margin-top: auto;
`;

export const JumpButton = styled("div")`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 1;
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
  transform: translate(-50%, -10%);
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey[600]};
  z-index: 1;
  cursor: pointer;
`;
