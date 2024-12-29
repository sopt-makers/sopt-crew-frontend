import Slider from 'react-slick';
import { styled } from 'stitches.config';
import NextArrow from './NextArrow';
import { GroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';
import GroupBrowsingCard from '../GroupBrowsingCard/GroupBrowsingCard';
import 'slick-carousel/slick/slick.css';
import { useEffect, useRef, useState } from 'react';

interface CarouselProps {
  cardList: GroupBrowsingCardResponse;
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
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    beforeChange: (current: number, next: number) => {
      setActiveSlide(next);
    },
    responsive: [
      {
        breakpoint: 1259,
        settings: {
          slidesToShow: 2.44,
          slidesToScroll: 2,
        },
      },
    ],
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
      width: '848px',
      minWidth: '848px',

      left: '-27px',
    },

    '@media (max-width: 850px)': {
      display: 'none',
    },
  },

  '.slick-list': {
    width: '1220px',
    minWidth: '1220px',

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
    mr: '24px',
  },

  '.slick-next': {
    transform: 'rotate(180deg)',
    mr: '17px',
    '@laptop': {
      mr: '0px',
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
  '@laptop': {},
});
