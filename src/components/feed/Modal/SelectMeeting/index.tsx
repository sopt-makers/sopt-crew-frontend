import { Arrow } from '@components/button/Arrow';
import ModalBackground from '@components/modal/ModalBackground';
import { getResizedImage } from '@utils/image';
import { useState } from 'react';
import { styled } from 'stitches.config';
import { GroupInfo } from '../FeedFormPresentation';
import SelectMeetingOptionItem from './SelectMeetingOptionItem';

interface SelectMeetingProps {
  selectMeetingInfo?: GroupInfo;
  meetingList: GroupInfo[];
  onClick: (meeting: GroupInfo) => void;
}

function SelectMeeting({ selectMeetingInfo, meetingList, onClick }: SelectMeetingProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelectClick = () => {
    setIsSelectOpen(prev => !prev);
  };

  const handleSelectItemClick = (meetingInfo: GroupInfo) => {
    onClick(meetingInfo);
    setIsSelectOpen(false);
  };

  return (
    <Container>
      <InfoWrapper onClick={handleSelectClick}>
        {selectMeetingInfo ? (
          <>
            <SThumbnailImage
              css={{
                backgroundImage: `url(${getResizedImage(selectMeetingInfo.imageUrl, 168)})`,
              }}
            />
            <SCategory>{selectMeetingInfo.category}</SCategory>
            <STitle>{selectMeetingInfo.title}</STitle>{' '}
          </>
        ) : (
          <STitle css={{ p: '$0' }}>어떤 모임의 피드를 작성할까요?</STitle>
        )}

        <Arrow direction={isSelectOpen ? 'top' : 'bottom'} css={{ margin: '0 0 0 6px' }} />
      </InfoWrapper>
      <ModalBackground
        onClick={isSelectOpen ? handleSelectClick : () => {}}
        css={{
          background: 'rgba(0, 0, 0, 0)',
          transition: 'all 0.3s ease',
          pointerEvents: isSelectOpen ? 'auto' : 'none',
        }}
      />
      <SelectWrapper isSelectOpen={isSelectOpen}>
        {meetingList.map(meetingInfo => (
          <SelectMeetingOptionItem
            meetingInfo={meetingInfo}
            isSelected={selectMeetingInfo?.id === meetingInfo.id}
            onClick={handleSelectItemClick}
          />
        ))}
      </SelectWrapper>
    </Container>
  );
}

export default SelectMeeting;

const Container = styled('div', {
  position: 'relative',
});

const InfoWrapper = styled('div', {
  mt: '$40',
  flexType: 'verticalCenter',
  cursor: 'pointer',
  '@tablet': {
    px: '$20',
  },
});

const SThumbnailImage = styled('div', {
  width: '56px',
  height: '56px',
  borderRadius: '$6',
  overflow: 'hidden',
  backgroundColor: '$gray800',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  '@tablet': {
    width: '40px',
    height: '40px',
  },
});

const SCategory = styled('p', {
  color: '$gray400',
  fontStyle: 'T3',
  ml: '$20',
  '@tablet': {
    fontStyle: 'T4',
    ml: '$12',
  },
});

const STitle = styled('p', {
  maxWidth: '70%',
  color: '$white',
  fontStyle: 'T3',
  ml: '$8',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  '@tablet': {
    fontStyle: 'T4',
  },
});

const SelectWrapper = styled('div', {
  position: 'absolute',
  top: '120%',
  left: 0,
  p: '$8',
  maxWidth: '500px',
  height: '344px',
  width: '100%',

  backgroundColor: '$gray700',
  borderRadius: '$6',
  zIndex: '$3',
  overflowX: 'hidden',
  overflowY: 'auto',
  transition: 'all 0.3s ease-in-out',
  variants: {
    isSelectOpen: {
      true: {
        height: '344px',
      },
      false: {
        height: '0px',
        p: '$0',
      },
    },
  },
});
