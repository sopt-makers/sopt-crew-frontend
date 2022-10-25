import { Box } from '@components/box/Box';
import Image, { StaticImageData } from 'next/image';
import Slider from 'react-slick';
import { styled } from 'stitches.config';
import NextArrow from './NextArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselProps {
  imageList: StaticImageData[];
}

const Carousel = ({ imageList }: CarouselProps) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <NextArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <SCarousel>
      <Slider {...settings}>
        {imageList.map((image, index) => (
          <SImageWrapper key={index}>
            <Image src={image} alt="" />
          </SImageWrapper>
        ))}
      </Slider>
    </SCarousel>
  );
};

export default Carousel;

const SCarousel = styled(Box, {
  '.slick-slider': {
    display: 'flex',
    alignItems: 'center',
    marginTop: '$60',
    marginBottom: '$80',
  },

  '& > div > div:first-child': {
    marginRight: '94px',
  },

  '& > div > div:last-child': {
    transform: 'rotate(180deg)',
    marginLeft: '93px',
  },
});

const SImageWrapper = styled(Box, {
  img: {
    borderRadius: '14px',
    objectFit: 'cover',
    width: '$869',
    height: '$594',
  },
});
