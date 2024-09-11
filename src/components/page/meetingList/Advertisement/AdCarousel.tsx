import React, { useCallback, useMemo } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { DotButton, useDotButton } from './AdCarouselDotBtn';
import { PrevButton, NextButton, usePrevNextButtons } from './AdCarouselArrowBtn';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { styled } from 'stitches.config';
import { paths } from '@/__generated__/schema2';
import Link from 'next/link';
import { useDisplay } from '@hooks/useDisplay';
import { ampli } from '@/ampli';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';

type PropType = {
  slides: paths['/advertisement/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['advertisements'];
  options?: EmblaOptionsType;
};

const AdCarousel: React.FC<PropType> = props => {
  const { slides, options } = props;

  const shuffledSlides = useMemo(() => {
    const shuffleArray = (array: typeof slides) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    return shuffleArray([...slides]);
  }, [slides]);

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

  const { data: me } = useQueryMyProfile();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Embla>
        <EmblaViewport ref={emblaRef}>
          <EmblaContainer>
            {shuffledSlides?.map((slide, index) => (
              <Link
                href={slide?.advertisementLink}
                target="_blank"
                onClick={() =>
                  ampli.clickBanner({
                    banner_id: slide.advertisementId,
                    banner_url: slide.advertisementLink,
                    banner_timestamp: slide.advertisementStartDate,
                    user_id: Number(me?.orgId),
                  })
                }
              >
                <EmblaSlide key={index}>
                  <EmblaSlideImage src={slide?.mobileImageUrl}></EmblaSlideImage>
                </EmblaSlide>
              </Link>
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

  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
});

export const EmblaViewport = styled('div', {
  borderRadius: '12px',
  overflow: 'hidden',
  '-webkit-backface-visibility': 'hidden',
  '-webkit-transform': 'translate3d(0, 0, 0)',
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
