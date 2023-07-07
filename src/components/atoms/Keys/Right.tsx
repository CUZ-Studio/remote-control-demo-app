interface Props {
  isPressed: boolean;
}

export default function RightIcon({ isPressed }: Props) {
  return (
    <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="48.5"
        cy="48.5"
        r="48"
        transform="rotate(90 48.5 48.5)"
        stroke={isPressed ? "#009ECF" : "#ECF0FC"}
        fill={isPressed ? "#ffffff" : "none"}
      />
      <path
        d="M62.9538 45.6178C64.5892 47.1914 64.5892 49.8088 62.9538 51.3824L46.5492 67.1677C44.008 69.613 39.7757 67.8121 39.7757 64.2854L39.7757 32.7148C39.7757 29.1881 44.008 27.3872 46.5492 29.8325L62.9538 45.6178Z"
        fill={isPressed ? "#009ECF" : "#073658"}
        stroke={isPressed ? "#FFFFFF" : "#ECF0FC"}
      />
    </svg>
  );
}
