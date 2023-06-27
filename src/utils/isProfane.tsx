import Filter from "badwords-ko";

interface Props {
  keyword: string;
}

export default function isProfane({ keyword }: Props) {
  const filter = new Filter();

  return filter.isProfane(keyword);
}
