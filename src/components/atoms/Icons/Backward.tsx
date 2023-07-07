import theme from "@/styles/theme";

interface Props {
  fill?: string;
}

export default function ArrowBackwardIcon({ fill }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 22L0 12L10 2L11.775 3.775L3.55 12L11.775 20.225L10 22Z"
        fill={fill ?? theme.palette.common.white}
      />
    </svg>
  );
}
