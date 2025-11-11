import { fontsObject } from '@sopt-makers/fonts';
import { DialogOptionType, useDialog } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

type SubmitButtonProps = {
  submitButtonLabel: React.ReactNode;
  cancelButtonLabel?: React.ReactNode;
  disabled: boolean;
  formRef: React.RefObject<HTMLFormElement>;
};

const SubmitPresentationButton = ({ cancelButtonLabel, submitButtonLabel, disabled, formRef }: SubmitButtonProps) => {
  const router = useRouter();
  const isEdit = router.asPath.includes('/edit');

  const { open } = useDialog();
  const dialogOption: DialogOptionType = {
    title: `모임을 ${isEdit ? '수정' : '개설'}하시겠습니까?`,
    description: '모임에 대한 설명이 충분히 작성되었는지 확인해 주세요',
    type: 'default',
    typeOptions: {
      cancelButtonText: '취소',
      approveButtonText: `${isEdit ? '수정' : '개설'}하기`,
      buttonFunction: () => {
        if (formRef.current) {
          formRef.current.requestSubmit();
        }
      },
    },
  };

  return (
    <ButtonContainer>
      {cancelButtonLabel && (
        <Button type="button" onClick={() => router.back()}>
          {cancelButtonLabel}
        </Button>
      )}
      <SubmitButton
        type="button"
        onClick={() => {
          open(dialogOption);
        }}
        disabled={disabled}
      >
        {submitButtonLabel}
      </SubmitButton>
    </ButtonContainer>
  );
};

export default SubmitPresentationButton;

const ButtonContainer = styled('div', {
  display: 'none',

  '@media (max-width: 1024px)': {
    display: 'flex',
    gap: '20px',
    alignSelf: 'flex-end',
  },

  '@media (max-width: 768px)': {
    width: '100%',
    marginBottom: '20px',
    gap: '10px',
  },
});

const Button = styled('button', {
  '@media (max-width: 1024px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...fontsObject.LABEL_2_16_SB,

    background: '$gray600',
    borderRadius: '10px',
    color: '$gray10',
    padding: '12px 20px',
  },

  '@media (max-width: 768px)': {
    width: '100%',
    ...fontsObject.LABEL_1_18_SB,
  },
});

const SubmitButton = styled(Button, {
  background: '$gray10',
  color: '$gray950',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.35,
  },
});
