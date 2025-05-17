import BoltIcon from '@assets/svg/icon_bolt.svg?rect';
import EventIcon from '@assets/svg/icon_event.svg?rect';
import SeminarIcon from '@assets/svg/icon_seminar.svg?rect';
import StudyIcon from '@assets/svg/icon_study.svg?rect';
import { CategoryKoType } from '@constants/option';
import { Tag } from '@sopt-makers/ui';
import { styled } from 'stitches.config';

type CategoryChipProps = {
  category: CategoryKoType;
  meetingKeywordTypes?: string[];
};

export const CategoryChip = ({ category, meetingKeywordTypes }: CategoryChipProps) => {
  const CategoryIcon = {
    번쩍: BoltIcon,
    스터디: StudyIcon,
    행사: EventIcon,
    세미나: SeminarIcon,
  }[category];

  return (
    <TagWrapper>
      <Tag
        shape="pill"
        size="sm"
        type="line"
        style={{ display: 'flex', gap: '2px', justifyContent: 'center', padding: '3px 8px' }}
      >
        <CategoryIcon width="18" height="18" fill="white" />
        {category}
      </Tag>
      {meetingKeywordTypes?.map((message, idx) => (
        <WelcomeTag key={idx}>{message}</WelcomeTag>
      ))}
    </TagWrapper>
  );
};

const TagWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$6',

  py: '$3',
});

const WelcomeTag = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '$3 $10',

  borderRadius: '37px',
  border: '1px solid $gray600',

  color: '$gray100',
  fontStyle: 'T6',
});
