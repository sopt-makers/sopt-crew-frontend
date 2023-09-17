import { styled } from 'stitches.config';
import CheckIcon from '@assets/svg/check_need_mentor.svg';
import { forwardRef } from 'react';

interface NeedMentorProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  value: boolean;
}

const NeedMentor = forwardRef<HTMLInputElement, NeedMentorProps>(({ value, ...props }, ref) => {
  return (
    <SNeedMentorField htmlFor={props.name}>
      <SCheckIcon active={value} />
      <div>
        <input id={props.name} type="checkbox" ref={ref} {...props} />
        <SNeedMentorLabel active={value}>멘토 구해요</SNeedMentorLabel>
      </div>
    </SNeedMentorField>
  );
});

export default NeedMentor;

const SNeedMentorField = styled('label', {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  cursor: 'pointer',
});
const SCheckIcon = styled(CheckIcon, {
  width: '12px',
  height: '12px',
  color: '$gray60',
  variants: {
    active: {
      // 임의처리
      true: { color: '$white100' },
    },
  },
});
const SNeedMentorLabel = styled('span', {
  fontAg: '12_medium_100',
  lineHeight: '180%',
  color: '$gray60',
  variants: {
    active: {
      // 임의처리
      true: { color: '$white100' },
    },
  },
  cursor: 'pointer',
});
