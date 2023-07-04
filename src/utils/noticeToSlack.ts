import axios from "axios";

import { Slack_Developer_User_ID } from "@/types";
interface Props {
  assignees: Slack_Developer_User_ID[];
  isUrgent?: boolean;
  errorName: string;
  errorCode: number;
  errorMessage: string;
}
export default function noticeToSlack({
  assignees, // SLACK user IDs
  isUrgent,
  errorName,
  errorCode,
  errorMessage,
}: Props) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL}`,
    JSON.stringify({
      text: `${assignees.map((assigneeID) => `<@${assigneeID}>`)} ${
        isUrgent ? ":rotating_light:" : ""
      } [${errorName}${errorCode ? ` - ${errorCode}` : ""}] ${errorMessage}`,
    }),
  );
}
