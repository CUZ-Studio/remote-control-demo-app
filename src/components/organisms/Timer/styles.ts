import { styled } from "@mui/material/styles";

import { TimeSchedule } from "@/types";

export const Time = styled("p", {
  shouldForwardProp: (props) => props !== "currentTimeSchedule",
})<{
  currentTimeSchedule: TimeSchedule | null;
}>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ currentTimeSchedule }) => {
    if (currentTimeSchedule === TimeSchedule.GAMING) return "#009ecf";
    else return "#8B98AD";
  }};
`;
