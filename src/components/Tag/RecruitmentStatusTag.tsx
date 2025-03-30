import { RECRUITMENT_STATUS } from '@constants/option';
import { HTMLAttributes } from 'react';
import { styled } from 'stitches.config';

interface RecruitmentStatusTagProps extends HTMLAttributes<HTMLDivElement> {
  status: 0 | 1 | 2;
}
const RecruitmentStatusTag = ({ status, ...props }: RecruitmentStatusTagProps) => {
  const tagVariant: ('default' | 'primary' | 'secondary')[] = ['secondary', 'primary', 'default'];

  // TODO: mds 태그로 변경 필요 (아직 mds 안 나옴)
  return (
    <CustomTag variant={tagVariant[status]} {...props}>
      {RECRUITMENT_STATUS[status]}
    </CustomTag>
  );
};

export default RecruitmentStatusTag;

const CustomTag = styled('div', {
  variants: {
    variant: {
      default: {
        background: '$gray700',
        color: '$gray10',
      },
      primary: {
        background: '$secondary',
        color: '$gray950',
      },
      secondary: {
        background: '$success',
        color: '$gray50',
      },
    },
  },

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '$3 $8',
  borderRadius: '$4',

  fontSize: '$16',
  fontStyle: 'normal',
  fontWeight: '$600',
  lineHeight: '$22',
  letterSpacing: '-0.32px',

  '@mobile': {
    padding: '$3 $6',

    fontSize: '$11',
    fontStyle: 'normal',
    fontWeight: '$600',
    lineHeight: '$14',
    letterSpacing: '-0.22px',
  },
});
