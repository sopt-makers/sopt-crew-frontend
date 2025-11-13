import { paths } from '@/__generated__/schema2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { styled } from 'stitches.config';
import NextArrow from './NextArrow';

interface CarouselProps {
  imageList: paths['/meeting/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8']['imageURL'];
}

const Carousel = ({ imageList }: CarouselProps) => {
  const imageListLength = imageList.length;

  const settings = {
    prevArrow: <NextArrow className="prev" total={imageListLength} />,
    nextArrow: <NextArrow className="next" total={imageListLength} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        },
      },
    ],
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

const SCarousel = styled('div', {
  '.slick-slider': {
    flexType: 'center',
    mt: '$60',
    mb: '$80',

    '@tablet': {
      mt: '$0',
      mb: '$32',
      display: 'block',
    },

    '@mobile': {
      mt: '0',
      mb: '$32',
      width: 'calc(100% + 40px)',
      height: '$246',
      marginLeft: '-20px',
      display: 'block',
    },

    '@media (max-width: 414px)': {
      width: 'calc(100% + 32px)',
      marginLeft: '-16px',
    },
  },

  '.slick-list': {
    width: '100%',
    maxWidth: '$869',
    borderRadius: '14px',

    '@mobile': {
      borderRadius: '$0',
    },
  },

  '.slick-prev': {
    mr: '94px',

    svg: {
      width: '72px',
      height: '72px',
    },

    '@laptop': {
      mr: '0',
    },

    '@tablet': {
      display: 'none',
    },
  },

  '.slick-next': {
    transform: 'rotate(180deg)',
    ml: '93px',

    svg: {
      width: '72px',
      height: '72px',
    },

    '@laptop': {
      ml: '0',
    },

    '@tablet': {
      display: 'none',
    },
  },

  '.slick-dots': {
    position: 'relative',
    top: '-27px',
    width: 'fit-content',
    height: '$17',
    margin: '0 auto',
    padding: '$6 $7',
    boxSizing: 'border-box',
    background: '$black60_trans',
    borderRadius: '32px',
  },

  '.slick-dots li': {
    position: 'relative',
    top: '-14px',
    display: 'inline-block',
    width: 'fit-content',

    '& + &': {
      ml: '$4',
    },
  },

  '.slick-dots li button': {
    display: 'block',
    width: '$5',
    height: '$5',
    fontSize: '0',
    cursor: 'pointer',
  },

  '.slick-dots li button:before': {
    content: '',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '$5',
    height: '$5',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: '50%',
  },

  '.slick-dots .slick-active button:before': {
    backgroundColor: '$gray10',
  },
});

const SImageWrapper = styled('div', {
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '$594',
    margin: '0 auto',

    '@laptop': {
      height: 'auto',
      aspectRatio: '760/520',
    },

    '@mobile': {
      height: '246px',
    },
  },
});
