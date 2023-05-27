import Disclosure from '@components/disclosure/Disclosure';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import DotWrapper from './DotWrapper';
import { styled } from 'stitches.config';

interface NoticeSliderProps {
  notices: {
    id: number;
    title: string;
    subTitle: string;
    contents: string;
    createdDate: string;
  }[];
}

export default function NoticeSlider({ notices }: NoticeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCurrentIndex = () => {
    const currentSlide = document.getElementsByClassName('slick-current')[0] as HTMLDivElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = parseInt(currentSlide.dataset.index!, 10);
    setCurrentIndex(index);
  };

  return (
    <Slider
      infinite={false}
      arrows={false}
      dots
      appendDots={DotWrapper}
      customPaging={index => <SDot active={index === currentIndex} />}
      afterChange={updateCurrentIndex}
    >
      {notices.map(notice => (
        <Disclosure
          key={notice.id}
          title={notice.title}
          subTitle={notice.subTitle}
          contents={notice.contents}
          createdDate={dayjs(notice.createdDate).format('YYYY.MM.DD')}
        />
      ))}
    </Slider>
  );
}

const SDot = styled('div', {
  width: '16px',
  height: '4px',
  background: '$black80',
  borderRadius: '10px',
  cursor: 'pointer',
  variants: {
    active: {
      true: {
        background: '$purple100',
      },
    },
  },
});
