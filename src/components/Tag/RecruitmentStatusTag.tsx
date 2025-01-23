import { Tag } from '@sopt-makers/ui';
import { RECRUITMENT_STATUS } from '@constants/option';
import { HTMLAttributes } from 'react';

interface RecruitmentStatusTagProps extends HTMLAttributes<HTMLDivElement> {
  status: 0 | 1 | 2;
}
const RecruitmentStatusTag = ({ status, style }: RecruitmentStatusTagProps) => {
  const tagVariant: ('default' | 'primary' | 'secondary')[] = ['secondary', 'primary', 'default'];

  return (
    <Tag style={style} size="md" shape="rect" variant={tagVariant[status]} type="solid">
      {RECRUITMENT_STATUS[status]}
    </Tag>
  );
};

export default RecruitmentStatusTag;
