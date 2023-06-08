import { ChangeEventHandler, FocusEventHandler } from "react";

import { StyledInput } from "./styles";
interface Props {
  value: string;
  error: boolean;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function BasicInput({ value, error, onFocus, onChange }: Props) {
  return (
    <StyledInput type="text" error={error} value={value} onFocus={onFocus} onChange={onChange} />
  );
}
