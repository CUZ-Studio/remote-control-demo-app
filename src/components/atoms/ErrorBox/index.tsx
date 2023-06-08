import { Box } from "./styles";

interface Props {
  children: string;
}

export default function ErrorBox({ children }: Props) {
  return <Box>{children}</Box>;
}
