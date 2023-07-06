import axios from "axios";

import { Swit_Developer_User_ID } from "@/types";

interface Props {
  assignees: Swit_Developer_User_ID[];
  isUrgent?: boolean;
  errorName: string;
  errorCode: number;
  errorMessage: string;
}

export default function noticeToSWIT({
  assignees,
  isUrgent,
  errorName,
  errorCode,
  errorMessage,
}: Props) {
  return (
    process.env.NODE_ENV !== "development" &&
    axios.post(`${process.env.NEXT_PUBLIC_SWIT_WEBHOOK_URL}`, {
      text: `${assignees.map((assigneeID) => `<@${assigneeID}>`)} ${
        isUrgent ? "🚨" : ""
      }  [${errorName}${errorCode ? ` - ${errorCode}` : ""}] ${errorMessage}`,
    })
  );
}
