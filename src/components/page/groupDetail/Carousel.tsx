import { Box } from '@components/box/Box';
import Slider from 'react-slick';
import { styled } from 'stitches.config';
import NextArrow from './NextArrow';
import 'slick-carousel/slick/slick.css';
import { ImageURLType } from 'src/api/meeting';

interface CarouselProps {
  imageList: ImageURLType[];
}

const Carousel = ({ imageList }: CarouselProps) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <NextArrow className="prev" />,
    nextArrow: <NextArrow className="next" />,
  };

  return (
    <SCarousel>
      <Slider {...settings}>
        {imageList.map(({ id, url }) => (
          <SImageWrapper key={id}>
            <img src={url} alt="" />
          </SImageWrapper>
        ))}
      </Slider>
    </SCarousel>
  );
};

export default Carousel;

const SCarousel = styled(Box, {
  '.slick-slider': {
    flexType: 'center',
    mt: '$60',
    mb: '$80',
  },

  '.slick-list': {
    borderRadius: '14px',
  },

  '.slick-prev': {
    mr: '94px',
  },

  '.slick-next': {
    transform: 'rotate(180deg)',
    ml: '93px',
  },
});

const SImageWrapper = styled(Box, {
  img: {
    objectFit: 'cover',
    width: '$869',
    height: '$594',
    margin: '0 auto',
  },
});
