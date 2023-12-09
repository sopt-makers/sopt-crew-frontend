import { getResizedImage } from '@utils/image';
import { styled } from 'stitches.config';
import { GroupInfo } from '../FeedFormPresentation';

interface SelectMeetingOptionItemProps {
  meetingInfo: GroupInfo;
  isSelected: boolean;
  onClick: (meetingInfo: GroupInfo) => void;
}

function SelectMeetingOptionItem({ meetingInfo, isSelected, onClick }: SelectMeetingOptionItemProps) {
  return (
    <>
      <SelectItemWrapper onClick={() => onClick(meetingInfo)} isSelected={isSelected}>
        <SelectItemThumbnailImage
          css={{
            backgroundImage: `url(${getResizedImage(meetingInfo.imageUrl, 168)})`,
          }}
        />
        <SelectItemInfoWrapper>
          <SelectItemTitleSection>
            <SelectItemCategory>{meetingInfo.category}</SelectItemCategory>
            <STitle>{meetingInfo.title}</STitle>
          </SelectItemTitleSection>
          <SelectItemContent>{meetingInfo.contents}</SelectItemContent>
        </SelectItemInfoWrapper>
      </SelectItemWrapper>
    </>
  );
}
export default SelectMeetingOptionItem;
const SelectItemWrapper = styled('div', {
  display: 'flex',
  padding: '10px 12px',
  borderRadius: '6px',
  mb: '$4',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$gray600',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: '$gray600',
      },
    },
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
const SelectItemThumbnailImage = styled('div', {
  width: '48px',
  height: '48px',
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

const SelectItemInfoWrapper = styled('div', {
  width: '80%',
  ml: '$14',
});

const SelectItemTitleSection = styled('div', {
  flexType: 'verticalCenter',
});

const SelectItemCategory = styled('p', {
  fontStyle: 'T4',
  color: '$secondary',
});

const SelectItemContent = styled('p', {
  fontStyle: 'B3',
  fontWeight: 400,
  lineHeight: '20px',
  color: '$gray300',
  width: '100%',
  maxWidth: '100%',

  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
});
