interface Props {
  isPressed: boolean;
}

export default function LeftIcon({ isPressed }: Props) {
  return (
    <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="48.5"
        cy="48.5"
        r="48"
        transform="rotate(-90 48.5 48.5)"
        stroke={isPressed ? "#009ECF" : "#ECF0FC"}
        fill={isPressed ? "#ffffff" : "none"}
      />
      <path
        d="M34.0462 51.3822C32.4108 49.8086 32.4108 47.1912 34.0462 45.6176L50.4508 29.8323C52.992 27.387 57.2243 29.1879 57.2243 32.7146L57.2243 64.2852C57.2243 67.8119 52.992 69.6128 50.4508 67.1675L34.0462 51.3822Z"
        fill={isPressed ? "#009ECF" : "#073658"}
        stroke={isPressed ? "#FFFFFF" : "#ECF0FC"}
      />
    </svg>
  );
}
