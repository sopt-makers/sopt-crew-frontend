import { Box } from '@components/box/Box';
import BigArrowIcon from '@components/icon/ArrowIcon';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { styled } from 'stitches.config';

interface CarouselProps {
  imageList: StaticImageData[];
}

function Carousel({ imageList }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState(imageList[index]);
  const lastIndex = imageList.length - 1;

  const handleLeftClick = () => {
    if (index > 0) setIndex(prev => prev - 1);
    else if (index === 0) setIndex(lastIndex);
  };

  const handleRightClick = () => {
    if (index < lastIndex) setIndex(prev => prev + 1);
    else if (index === lastIndex) setIndex(0);
  };

  useEffect(() => {
    setImage(imageList[index]);
  }, [index]);

  return (
    <SCarousel>
      <SButton onClick={handleLeftClick}>
        <BigArrowIcon />
      </SButton>
      <SImageWrapper>
        <Image src={image} width="869" height="594" alt="" />
      </SImageWrapper>
      <SButton onClick={handleRightClick}>
        <BigArrowIcon />
      </SButton>
    </SCarousel>
  );
}

export default Carousel;

const SCarousel = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& button:last-child': {
    transform: 'rotate(180deg)',
  },
});

const SButton = styled('button', {
  width: '$72',
  height: '$72',

  '& svg': {
    display: 'block',
    margin: '0 auto',
  },

  '& path': {
    stroke: '$black20',
  },

  '&:hover': {
    path: {
      stroke: '$white',
    },
  },
});

const SImageWrapper = styled(Box, {
  marginTop: '$60',
  marginBottom: '$80',
  img: { borderRadius: '14px', objectFit: 'cover' },
});
