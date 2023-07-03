import axios from "axios";

import { Developer } from "@/types";

interface Props {
  assignees: Developer[];
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
  return axios.post(`${process.env.NEXT_PUBLIC_SWIT_WEBHOOK_URL}`, {
    text: `${assignees.map((assigneeID) => `<@${assigneeID}>`)} ${
      isUrgent && "🚨"
    }  [${errorName} - ${errorCode}] ${errorMessage}`,
  });
}
