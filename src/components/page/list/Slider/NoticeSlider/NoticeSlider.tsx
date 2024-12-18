import Disclosure from '@components/disclosure/Disclosure';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import DotWrapper from './DotWrapper';
import { styled } from 'stitches.config';
import { paths } from '@/__generated__/schema2';

interface NoticeSliderProps {
  notices: paths['/notice/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'] | undefined;
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
      {notices ? (
        notices
          .map(notice => (
            <Disclosure
              key={notice.id}
              title={notice.title}
              subTitle={notice.subTitle}
              contents={notice.contents}
              createdDate={dayjs(notice.createdDate).format('YYYY.MM.DD')}
            />
          ))
          .reverse()
      ) : (
        // to minimize CLS, put a placeholder
        <SPlaceholder />
      )}
    </Slider>
  );
}

const SDot = styled('div', {
  width: '16px',
  height: '4px',
  background: '$gray800',
  borderRadius: '10px',
  cursor: 'pointer',
  variants: {
    active: {
      true: {
        // 임시지정ㄴ
        background: '$gray10',
      },
    },
  },
});
const SPlaceholder = styled('div', {
  width: '100%',
  minHeight: '158px',
  '@mobile': {
    minHeight: '86px',
  },
});
