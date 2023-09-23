import { Box } from '@components/box/Box';
import Textarea from '@components/form/Textarea';
import { useState } from 'react';
import { styled } from 'stitches.config';

interface ApplicationModalContentProps {
  handleApplicationButton: (textareaValue: string) => void;
  disabled?: boolean;
}

const ApplicationModalContent = ({ handleApplicationButton, disabled }: ApplicationModalContentProps) => {
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <SApplicationModalContent>
      <Textarea
        value={textareaValue}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextareaValue(e.target.value)}
        placeholder="(선택사항) 모임에 임할 각오를 입력해주세요, 입력한 각오는 개설자에게 전달돼요"
        maxLength={150}
        error={textareaValue.length >= 150 ? '150자 까지 입력할 수 있습니다.' : ''}
      />
      <button disabled={disabled} onClick={() => handleApplicationButton(textareaValue)}>
        신청하기
      </button>
    </SApplicationModalContent>
  );
};

export default ApplicationModalContent;

const SApplicationModalContent = styled(Box, {
  padding: '$24 $24 $40 $24',
  borderRadius: '0 0 16px 16px',

  '@tablet': {
    padding: '0 $16',
  },

  '& > p': {
    fontAg: '32_bold_100',
    textAlign: 'center',
    mt: '$32',
    mb: '$48',
  },

  label: {
    margin: 0,
  },

  textarea: {
    width: '100%',
    height: '$200',
    fontAg: '16_medium_150',
    color: '$white100',
    backgroundColor: '$black60',
    outline: 'none',
    borderRadius: '10px',

    '@tablet': {
      height: '$160',
      padding: '$12',
      fontAg: '16_medium_150',
    },
  },

  'textarea:focus': {
    boxShadow: `0 0 0 1px #C0C5C9`,
  },

  button: {
    display: 'block',
    margin: '0 auto',
    mt: '$4',
    padding: '$19 0',
    width: '$180',
    borderRadius: '12px',
    textAlign: 'center',
    fontAg: '18_bold_100',
    color: '$black100',
    backgroundColor: '$white100',

    '&:disabled': {
      opacity: 0.35,
      cursor: 'not-allowed',
    },

    '@tablet': {
      width: '$130',
      padding: '$16 0',
      mt: '$8',
      mb: '$24',
      fontAg: '14_bold_100',
    },
  },
});
