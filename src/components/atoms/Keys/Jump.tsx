interface Props {
  isPressed: boolean;
}

export default function JumpIcon({ isPressed }: Props) {
  return (
    <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="48.5"
        cy="48.5"
        r="48"
        stroke={isPressed ? "#009ECF" : "#ECF0FC"}
        fill={isPressed ? "#ffffff" : "none"}
      />
      <path
        d="M45.6173 34.0464C47.1909 32.4111 49.8083 32.4111 51.3819 34.0464L67.1672 50.451C69.6125 52.9922 67.8116 57.2245 64.2849 57.2245H32.7143C29.1876 57.2245 27.3867 52.9922 29.832 50.451L45.6173 34.0464Z"
        fill={isPressed ? "#009ECF" : "#073658"}
        stroke={isPressed ? "#FFFFFF" : "#ECF0FC"}
      />
    </svg>
  );
}
