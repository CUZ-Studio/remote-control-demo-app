import { Dispatch, SetStateAction } from "react";

import SectionCard from "@/components/molecules/SectionCard";

import { Container } from "./styles";

interface Props {
  selectedSection: number;
  setSelectedSection: Dispatch<SetStateAction<number>>;
}

export default function CardRoulette({ selectedSection, setSelectedSection }: Props) {
  return (
    <Container>
      <SectionCard
        sectionNumber={selectedSection === 2 ? 4 : selectedSection - 1}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <SectionCard
        sectionNumber={selectedSection}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <SectionCard
        sectionNumber={selectedSection === 4 ? 2 : selectedSection + 1}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
    </Container>
  );
}
