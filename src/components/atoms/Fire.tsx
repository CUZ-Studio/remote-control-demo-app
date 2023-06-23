import theme from "@/styles/theme";

interface Props {
  isPressed: boolean;
}

export default function Fire({ isPressed }: Props) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32.3767 20.5333C31.955 19.9833 31.4417 19.5067 30.965 19.03C29.7367 17.93 28.3434 17.1417 27.17 15.9867C24.4384 13.31 23.8334 8.89167 25.575 5.5C23.8334 5.92167 22.3117 6.875 21.01 7.92C16.2617 11.7333 14.3917 18.4617 16.6284 24.2367C16.7017 24.42 16.775 24.6033 16.775 24.8417C16.775 25.245 16.5 25.6117 16.1334 25.7583C15.7117 25.9417 15.2717 25.8317 14.9234 25.5383C14.8187 25.4518 14.7316 25.346 14.6667 25.2267C12.595 22.605 12.265 18.8467 13.6584 15.84C10.5967 18.3333 8.92836 22.55 9.1667 26.5283C9.2767 27.445 9.3867 28.3617 9.69836 29.2783C9.95503 30.3783 10.45 31.4783 11 32.45C12.98 35.6217 16.4084 37.895 20.0934 38.3533C24.0167 38.8483 28.215 38.1333 31.2217 35.42C34.5767 32.3767 35.75 27.5 34.0267 23.32L33.7884 22.8433C33.4034 22 32.3767 20.5333 32.3767 20.5333ZM26.5834 32.0833C26.07 32.5233 25.2267 33 24.5667 33.1833C22.5134 33.9167 20.46 32.89 19.25 31.68C21.4317 31.1667 22.7334 29.5533 23.1184 27.9217C23.43 26.455 22.8434 25.245 22.605 23.8333C22.385 22.4767 22.4217 21.3217 22.9167 20.0567C23.265 20.7533 23.6317 21.45 24.0717 22C25.4834 23.8333 27.7017 24.64 28.1784 27.1333C28.2517 27.39 28.2884 27.6467 28.2884 27.9217C28.3434 29.425 27.6834 31.075 26.5834 32.0833Z"
        fill={isPressed ? theme.palette.error.main : theme.palette.common.black}
      />
    </svg>
  );
}
