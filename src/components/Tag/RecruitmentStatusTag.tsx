import { RECRUITMENT_STATUS } from '@constants/option';
import { fontsObject } from '@sopt-makers/fonts';
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
      <CustomTagText>{RECRUITMENT_STATUS[status]}</CustomTagText>
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

  '@mobile': {
    padding: '$3 $6',
  },
});

const CustomTagText = styled('p', {
  ...fontsObject.LABEL_2_16_SB,

  '@mobile': {
    ...fontsObject.LABEL_5_11_SB,
  },
});
