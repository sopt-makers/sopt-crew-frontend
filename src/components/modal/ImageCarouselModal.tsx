import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import ModalContainer from './ModalContainer';
import useEmblaCarousel from 'embla-carousel-react';
import ArrowLeft from 'public/assets/svg/arrow_big_left.svg';
import ArrowRight from 'public/assets/svg/arrow_big_right.svg';
import CloseIcon from 'public/assets/svg/x_big.svg';
import { useEffect, useState } from 'react';

interface ImageCarouselModalProps {
  isOpen: boolean;
  close: () => void;
  images: string[];
  startIndex?: number;
}

export default function ImageCarouselModal({ isOpen, close, images, startIndex = 0 }: ImageCarouselModalProps) {
  const [emblaRef, api] = useEmblaCarousel({ startIndex, duration: 0 });
  const [currentIndex, setCurrentIndex] = useState(startIndex + 1);

  useEffect(() => {
    if (!api) return;
    api.on('select', () => setCurrentIndex(api.selectedScrollSnap() + 1));

    return () => {
      api.destroy();
    };
  }, [api]);

  return (
    <ModalContainer isModalOpened={isOpen} handleModalClose={close}>
      <ModalWrapper>
        <Container>
          {/* top 고정 요소 */}
          {/* eslint-disable-next-line prettier/prettier */}
          <Counter>{currentIndex} / {images.length}</Counter>
          <CloseButton onClick={close}>
            <CloseIcon />
          </CloseButton>

          <ArrowButton style={{ marginLeft: '24px' }} onClick={() => api?.scrollPrev()}>
            <ArrowLeft />
          </ArrowButton>
          <CarouselContainer ref={emblaRef}>
            <CarouselScrollContainer>
              {images.map(image => (
                <CarouselItem>
                  <Image src={image} />
                </CarouselItem>
              ))}
            </CarouselScrollContainer>
          </CarouselContainer>
          <ArrowButton style={{ marginRight: '24px' }} onClick={() => api?.scrollNext()}>
            <ArrowRight />
          </ArrowButton>
        </Container>
      </ModalWrapper>
    </ModalContainer>
  );
}
const ModalWrapper = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  flexType: 'center',
  zIndex: '$2',
  backgroundColor: '#181818',
  width: '100%',
  height: '100%',
});
const Container = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  color: 'white',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
});
const Counter = styled('div', {
  position: 'absolute',
  top: '28px',
  left: '48px',
  color: 'white',
  fontStyle: 'T1',
  '@tablet': {
    top: '8px',
    left: '16px',
    fontStyle: 'H3',
    lineHeight: '28px',
  },
});
const CloseButton = styled('button', {
  position: 'absolute',
  top: '32px',
  right: '48px',
  width: '24px',
  height: '24px',
  border: 'none',
  outline: 'none',
  '@tablet': {
    top: '10px',
    right: '13px',
  },
});
const CarouselContainer = styled('div', {
  overflow: 'hidden',
});
const CarouselScrollContainer = styled('div', {
  display: 'flex',
  maxWidth: '1280px',
  height: '100vh',
  maxHeight: '600px',
});
const CarouselItem = styled('div', {
  flexType: 'center',
  width: '100%',
  height: '100%',
  flex: '0 0 100%',
  minWidth: 0,
});
const Image = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});
const ArrowButton = styled('button', {
  flexType: 'center',
  width: '72px',
  height: '72px',
  flexShrink: 0,
  borderRadius: '20px',
  background: '$black80',
  '@tablet': {
    display: 'none',
  },
});
