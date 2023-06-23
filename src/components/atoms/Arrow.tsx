import theme from "@/styles/theme";

interface Props {
  isPressed: boolean;
}

export default function Arrow({ isPressed }: Props) {
  return (
    <svg width="45" height="85" viewBox="0 0 45 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M-2.12e-06 42.5L45 0.49777L45 84.5022L-2.12e-06 42.5Z"
        fill={isPressed ? theme.palette.error.main : theme.palette.grey[200]}
      />
    </svg>
  );
}
