import { styled } from 'stitches.config';
import { forwardRef } from 'react';
import CheckSelectedIcon from '@assets/svg/checkBox/form_selected.svg';
import CheckUnselectedIcon from '@assets/svg/checkBox/form_unselected.svg';

interface NeedMentorProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  value: boolean;
}

const NeedMentor = forwardRef<HTMLInputElement, NeedMentorProps>(({ value, ...props }, ref) => {
  return (
    <SNeedMentorField htmlFor={props.name}>
      {value ? <CheckSelectedIcon /> : <CheckUnselectedIcon />}
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

const SNeedMentorLabel = styled('span', {
  fontAg: '12_medium_100',
  lineHeight: '180%',
  color: '$gray300',
  variants: {
    active: {
      true: { color: '$gray10' },
    },
  },
  cursor: 'pointer',
});
