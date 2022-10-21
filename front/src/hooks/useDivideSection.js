import { useState } from 'react';

//////// 너무 About.js 코드가 길어져서 일단 분리함, 아직 재사용성 고려해서 리팩토링 안함

export default function useDivideSection(divide = 2) {
  const [currentSection, setCurrentSection] = useState(1);

  const { innerHeight } = window;

  const subSection = divide;

  const firstSection = innerHeight + innerHeight / subSection;
  const secondSection = innerHeight * 2 + innerHeight / subSection;
  const thirdSection = innerHeight * 3 + innerHeight / subSection;
  const fourthSection = innerHeight * 4 + innerHeight / subSection;
  const fifthSection = innerHeight * 5 + innerHeight / subSection;

  const scrollEventHandler = () => {
    const { scrollY } = window;
    const currentWindowHeight = innerHeight + scrollY;

    if (
      firstSection < currentWindowHeight &&
      secondSection > currentWindowHeight &&
      currentSection !== 2
    ) {
      setCurrentSection(2);
      return;
    }

    if (
      secondSection < currentWindowHeight &&
      thirdSection > currentWindowHeight &&
      currentSection !== 3
    ) {
      setCurrentSection(3);
      return;
    }

    if (
      thirdSection < currentWindowHeight &&
      fourthSection > currentWindowHeight &&
      currentSection !== 4
    ) {
      setCurrentSection(4);
      return;
    }

    if (
      fourthSection < currentWindowHeight &&
      fifthSection > currentWindowHeight &&
      currentSection !== 5
    ) {
      setCurrentSection(5);
      return;
    }

    if (fifthSection < currentWindowHeight && currentSection !== 6) {
      setCurrentSection(6);
      return;
    }

    setCurrentSection(1);
  };

  const sections = {
    firstSection,
    secondSection,
    thirdSection,
    fourthSection,
    fifthSection,
  };

  return {
    currentSection,
    scrollEventHandler,
    sections,
    innerHeight,
    subSection,
  };
}
