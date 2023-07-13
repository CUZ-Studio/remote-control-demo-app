import { MouseEventHandler, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";

import usePlayer from "@/hooks/usePlayer";
import { Page } from "@/types";

import {
  BlackPaper,
  ChapterCard,
  ChapterInfo,
  ChapterList,
  ChapterNumber,
  ChapterSubTitle,
  ChapterTitle,
  Container,
  EnterButton,
  ImageWrapper,
  Inner,
  Title,
  TitleWrapper,
} from "@/styles/start-your-journey.styles";

const chapterInfo = [
  {
    chapterNumber: 2,
    title: "Time Portal",
    subtitle: "타임 포탈",
  },
  {
    chapterNumber: 3,
    title: "Towards Timeless Past",
    subtitle: "과거를 향해",
  },
  {
    chapterNumber: 4,
    title: "Time Walker",
    subtitle: "시간여행자의 영광",
  },
];

export default function Welcome() {
  const router = useRouter();
  const player = usePlayer();
  const [selectedSection, setSelectedSection] = useState(3);

  const enterSection: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const path = (() => {
      switch (selectedSection) {
        case 3:
        default: {
          if (!player?.modelType) return Page.SELECT_MODEL;
          else if (!player?.modelColor) return Page.CUSTOMIZE_DESIGN;
          else if (!player?.headTag) return Page.NAME_YOUR_ROBOT;
          else return Page.WAITING_ROOM;
        }
      }
    })();

    router.push(path);
  };

  return (
    <Container isMobile={isMobile} selectedSection={selectedSection}>
      <Inner>
        <Title chapterNumber={selectedSection}>Dear Earth</Title>
        <ImageWrapper>
          <Image
            src={`/assets/images/startYourJourney/${selectedSection}_RepresentativeImage.png`}
            alt={`section ${selectedSection}`}
            width={310}
            height={310}
          />
        </ImageWrapper>
        <ChapterList>
          {chapterInfo.map((chapter) => (
            <ChapterCard
              key={chapter.title}
              isSelected={selectedSection === chapter.chapterNumber}
              chapterNumber={chapter.chapterNumber}
              onClick={() => setSelectedSection(chapter.chapterNumber)}
            >
              <BlackPaper />
              <ChapterNumber
                isSelected={selectedSection === chapter.chapterNumber}
                chapterNumber={chapter.chapterNumber}
              >
                {chapter.chapterNumber}
              </ChapterNumber>
              <ChapterInfo>
                <TitleWrapper
                  isSelected={selectedSection === chapter.chapterNumber}
                  chapterNumber={chapter.chapterNumber}
                >
                  <ChapterTitle isSelected={selectedSection === chapter.chapterNumber}>
                    {chapter.title}
                  </ChapterTitle>
                  <ChapterSubTitle
                    isSelected={selectedSection === chapter.chapterNumber}
                    chapterNumber={chapter.chapterNumber}
                  >
                    : {chapter.subtitle}
                  </ChapterSubTitle>
                </TitleWrapper>
                <EnterButton
                  type="button"
                  isSelected={selectedSection === chapter.chapterNumber}
                  chapterNumber={chapter.chapterNumber}
                  onClick={enterSection}
                >
                  입장하기
                </EnterButton>
              </ChapterInfo>
            </ChapterCard>
          ))}
        </ChapterList>
      </Inner>
    </Container>
  );
}
