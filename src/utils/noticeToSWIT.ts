import axios from "axios";

interface Props {
  isUrgent?: boolean;
  errorName: string;
  errorCode: number;
  errorMessage: string;
}

export default function noticeToSWIT({ isUrgent, errorName, errorCode, errorMessage }: Props) {
  return axios.post(`${process.env.NEXT_PUBLIC_SWIT_WEBHOOK_URL}`, {
    text: `${isUrgent && "🚨"}  [${errorName} - ${errorCode}] ${errorMessage}`,
  });
}
