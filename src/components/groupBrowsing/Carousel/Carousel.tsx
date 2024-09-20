import Slider from 'react-slick';
import { styled } from 'stitches.config';
import NextArrow from './NextArrow';
import { GetGroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';
import GroupBrowsingCard from '../GroupBrowsingCard/GroupBrowsingCard';
import 'slick-carousel/slick/slick.css';
import { useEffect, useRef, useState } from 'react';

interface CarouselProps {
  cardList: GetGroupBrowsingCardResponse;
}

const Carousel = ({ cardList }: CarouselProps) => {
  const cardListLength = cardList.length;
  const [oldSlide, setOldSlide] = useState(0);
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
      <SPrevBlankArrow></SPrevBlankArrow>
    ) : (
      <SPrevArrowContainer>
        <NextArrow className="prev" total={cardListLength} activeSlide={activeSlide} cardListLength={cardListLength} />
      </SPrevArrowContainer>
    ),
    nextArrow: isLastPage ? (
      <SNextBlankArrow></SNextBlankArrow>
    ) : (
      <SNextArrowContainer>
        <NextArrow className="next" total={cardListLength} activeSlide={activeSlide} cardListLength={cardListLength} />
      </SNextArrowContainer>
    ),
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    beforeChange: (current: number, next: number) => {
      setOldSlide(current);
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
  '.slick-slider': {
    flexType: 'center',
    position: 'relative',
    maxWidth: '1328px',
    width: '100vw',

    '@media (max-width: 1259px)': {
      width: '848px',
      minWidth: '848px',
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

    '@media (max-width: 1259px)': {
      width: '732px',
      minWidth: '732px',
    },
  },

  '.slick-prev': {
    mr: '24px',
  },

  '.slick-next': {
    transform: 'rotate(180deg)',
    mr: '17px',
    '@media (max-width: 1259px)': {
      mr: '0px',
    },
  },
});

const SPrevBlankArrow = styled('div', {
  width: '$40',
  position: 'absolute',
  left: '$0',
});

const SNextBlankArrow = styled('div', {
  width: '$40',
  position: 'absolute',
  right: '$0',
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
  '@media (max-width: 1259px)': {},
});
