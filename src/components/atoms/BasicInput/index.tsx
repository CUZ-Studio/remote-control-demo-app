import { ChangeEventHandler } from "react";

import { StyledInput } from "./styles";
interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function BasicInput({ value, onChange }: Props) {
  return <StyledInput type="text" value={value} onChange={onChange} />;
}
