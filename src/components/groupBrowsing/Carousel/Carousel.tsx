import Slider from 'react-slick';
import { styled } from 'stitches.config';
import NextArrow from './NextArrow';
import { GroupBrowsingCardDetail } from '@api/meeting';
import GroupBrowsingCard from '../GroupBrowsingCard/GroupBrowsingCard';
import 'slick-carousel/slick/slick.css';

interface CarouselProps {
  cardList: GroupBrowsingCardDetail[];
}

const Carousel = ({ cardList }: CarouselProps) => {
  const cardListLength = cardList.length;

  const settings = {
    prevArrow: <NextArrow className="prev" total={cardListLength} />,
    nextArrow: <NextArrow className="next" total={cardListLength} />,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 850,
        settings: {},
      },
    ],
  };

  return (
    <SCarousel>
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

    '@media (max-width: 850px)': {
      display: 'none',
    },
  },

  '.slick-list': {
    width: '1200px',

    '@media (max-width: 1260px)': {
      width: '732px',
    },
  },

  '.slick-prev': {
    mr: '24px',
  },

  '.slick-next': {
    transform: 'rotate(180deg)',
    ml: '24px',
  },
});
