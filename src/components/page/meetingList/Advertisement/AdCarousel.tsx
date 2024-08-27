import React, { useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { DotButton, useDotButton } from './AdCarouselDotBtn';
import { PrevButton, NextButton, usePrevNextButtons } from './AdCarouselArrowBtn';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { styled } from 'stitches.config';
import { paths } from '@/__generated__/schema2';
import Link from 'next/link';
import { useDisplay } from '@hooks/useDisplay';

type PropType = {
  slides: paths['/advertisement/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['advertisementImages'];
  link: paths['/advertisement/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['advertisementLink'];
  options?: EmblaOptionsType;
};

const AdCarousel: React.FC<PropType> = props => {
  const { slides, link, options } = props;
  const { isDesktop } = useDisplay();
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(
    emblaApi,
    onNavButtonClick
  );

  return (
    <Link href={link} target="_blank">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Embla>
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {slides?.map((slide, index) => (
                <EmblaSlide key={index}>
                  <EmblaSlideImage src={slide.imageUrl}></EmblaSlideImage>
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>

          {isDesktop ? (
            <>
              <EmblaButtons onClick={e => e.preventDefault()}>
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
              </EmblaButtons>
              <EmblaDots onClick={e => e.preventDefault()}>
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
                  />
                ))}
              </EmblaDots>
            </>
          ) : (
            <div style={{ position: 'relative' }}>
              <EmblaDots onClick={e => e.preventDefault()}>
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
                  />
                ))}
              </EmblaDots>
            </div>
          )}
        </Embla>
      </div>
    </Link>
  );
};

export default AdCarousel;

export const Embla = styled('div', {
  width: '380px',
  height: '380px',
  '@mobile': {
    width: '320px',
    height: '320px',
  },
  '@media (max-width: 320px)': {
    width: '280px',
    height: '280px',
  },
});

export const EmblaViewport = styled('div', {
  overflow: 'hidden',
  borderRadius: '12px',
});

export const EmblaContainer = styled('div', {
  display: 'flex',
  touchAction: 'pan-y pinch-zoom',
});

export const EmblaSlide = styled('div', {
  transform: 'translate3d(0, 0, 0)',
});

export const EmblaSlideImage = styled('img', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  width: '380px',
  height: '380px',
  '@mobile': {
    width: '320px',
    height: '320px',
  },
  '@media (max-width: 320px)': {
    width: '280px',
    height: '280px',
  },
});

export const EmblaControls = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  justifyContent: 'space-between',
  gap: '1.2rem',
  marginTop: '1.8rem',
});

export const EmblaButtons = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '100%',
  padding: '4px',
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  pointerEvents: 'none',

  [`${Embla}:hover &`]: {
    opacity: 1,
  },
});

export const EmblaButton = styled('button', {
  '-webkit-tap-highlight-color': 'rgba($textHighContrast, 0.5)',
  appearance: 'none',
  backgroundColor: 'transparent',
  touchAction: 'manipulation',
  display: 'inline-flex',
  textDecoration: 'none',
  cursor: 'pointer',
  border: '0',
  padding: '0',
  margin: '0',
  boxShadow: '$inset $detailMediumContrast',
  width: '$buttonSize',
  height: '$buttonSize',
  zIndex: '1',
  borderRadius: '$button',
  color: '$textBody',
  alignItems: 'center',
  justifyContent: 'center',

  '&:disabled': {
    color: '$detailHighContrast',
  },

  '.embla__button__svg': {
    width: '35%',
    height: '35%',
  },
});

export const EmblaDots = styled('div', {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: '16px',
});

export const EmblaDot = styled('button', {
  appearance: 'none',
  backgroundColor: 'transparent',
  touchAction: 'manipulation',
  display: 'inline-flex',
  textDecoration: 'none',
  cursor: 'pointer',
  border: '0',
  padding: '0',
  margin: '0',
  width: '16px',
  height: '4px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$round',

  '&:after': {
    boxShadow: '$inset $detailMediumContrast',
    width: '$dotInnerSize',
    height: '$dotInnerSize',
    borderRadius: '$round',
    display: 'flex',
    alignItems: 'center',
    content: "''",
  },
});
