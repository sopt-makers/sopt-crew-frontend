import { GetMeetingList } from '@api/meeting/type';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { styled } from 'stitches.config';
import GroupBrowsingCard from '../GroupBrowsingCard/GroupBrowsingCard';
import NextArrow from './NextArrow';

interface CarouselProps {
  cardList: GetMeetingList['response']['meetings'];
}

const Carousel = ({ cardList }: CarouselProps) => {
  const cardListLength = cardList.length;
  const [activeSlide, setActiveSlide] = useState(0);

  // 캐러셀 컴포넌트의 현재 width 값을 observe 하는 코드
  const [width, setWidth] = useState(0);
  const componentRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      // eslint-disable-next-line prefer-const
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    componentRef.current && resizeObserver.observe(componentRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const isLastPage =
    width > 1227 ? activeSlide / 4 + 1 === cardListLength / 4 : activeSlide / 2 + 1.5 > cardListLength / 2;
  const isFirstPage = activeSlide === 0;

  const settings = {
    prevArrow: isFirstPage ? (
      <SBlankArrow></SBlankArrow>
    ) : (
      <SPrevArrowContainer>
        <NextArrow className="prev" total={cardListLength} />
      </SPrevArrowContainer>
    ),
    nextArrow: isLastPage ? (
      <SBlankArrow></SBlankArrow>
    ) : (
      <SNextArrowContainer>
        <NextArrow className="next" total={cardListLength} />
      </SNextArrowContainer>
    ),
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: false,
    beforeChange: (current: number, next: number) => {
      setActiveSlide(next);
    },
  };

  return (
    <SCarousel ref={componentRef}>
      <Slider {...settings}>
        {cardList.map(card => (
          <GroupBrowsingCard key={card.id} {...card}></GroupBrowsingCard>
        ))}
      </Slider>
    </SCarousel>
  );
};

export default Carousel;

const SCarousel = styled('div', {
  position: 'relative',

  '.slick-slider': {
    flexType: 'center',
    position: 'relative',
    maxWidth: '1328px',
    width: '100vw',

    '@laptop': {
      width: '100%',

      left: '-27px',
    },
  },

  '.slick-list': {
    width: '1200px',
    minWidth: '1200px',

    '& a': {
      flexType: 'center',
    },

    '@laptop': {
      width: '732px',
      minWidth: '732px',

      '&:after': {
        content: '""',
        position: 'absolute',
        top: '0',
        right: '-1px',
        width: '100px',
        height: '100%',
        background: 'linear-gradient(270deg, #0F0F12 0%, rgba(15, 15, 18, 0.00) 100%)',
        pointerEvents: 'none',
      },
    },
  },

  '.slick-prev': {
    '@laptop': {
      left: '-10px',
    },
  },

  '.slick-next': {
    transform: 'rotate(180deg)',
    '@laptop': {
      right: '-10px',
    },
  },
});

const SBlankArrow = styled('div', {
  width: '$40',
  position: 'absolute',
  left: '$0',
});

const SPrevArrowContainer = styled('div', {
  position: 'absolute',
  left: '$0',
  zIndex: '1',
});

const SNextArrowContainer = styled('div', {
  position: 'absolute',
  right: '$0',
  zIndex: '1',
});
