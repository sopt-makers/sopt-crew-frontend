import CheckedIcon from '@assets/svg/icon_progress_checked.svg';
import UncheckedIcon from '@assets/svg/icon_progress_unchecked.svg';
import { Button, DialogOptionType, useDialog } from '@sopt-makers/ui';
import { FormType } from '@type/form';
import { useRouter } from 'next/router';
import { useFormContext, useWatch } from 'react-hook-form';
import { styled } from 'stitches.config';

interface TableOfContentsProps {
  label: string;
  // onSubmit: React.FormEventHandler<HTMLFormElement>;
  // onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: () => void;
  cancelButtonLabel?: React.ReactNode;
  submitButtonLabel: React.ReactNode;
  disabled: boolean;
}

function TableOfContents({ label, onSubmit, cancelButtonLabel, submitButtonLabel, disabled }: TableOfContentsProps) {
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
      buttonFunction: onSubmit,
    },
  };
  const {
    control,
    formState: { errors },
  } = useFormContext<FormType>();
  const form = useWatch({ control });
  const isTitleValid = form.title && !errors.title;
  const isCategoryValid = form.category?.value && !errors.category;
  const isKeywordValid = form.meetingKeywordTypes && form.meetingKeywordTypes.length > 0 && !errors.meetingKeywordTypes;
  const isImageValid = form.files && form.files.length > 0;
  const isDescriptionValid = form.detail && form.detail.desc && !errors.detail;
  const isApplicationDateValid =
    form.dateRange && form.dateRange[0] && form.dateRange[1] && !errors.dateRange && !errors.dateRange;
  const isTargetValid =
    form.detail &&
    form.detail.joinableParts &&
    form.detail.joinableParts.length > 0 &&
    form.capacity &&
    !errors.capacity &&
    !errors.detail;

  const hasCoLeader = form.detail?.coLeader && form.detail.coLeader.length > 0;
  const hasLeaderDesc = form.detail?.leaderDesc && form.detail.leaderDesc.length > 0;
  const hasWelcomeMessageTypes =
    form.welcomeMessageTypes && form.welcomeMessageTypes.length > 0 && !errors.welcomeMessageTypes;

  const isRequiredInfoChecked =
    isTitleValid &&
    isCategoryValid &&
    isKeywordValid &&
    isImageValid &&
    isDescriptionValid &&
    isApplicationDateValid &&
    isTargetValid;

  const isOptionalInfoChecked = hasCoLeader || hasLeaderDesc || hasWelcomeMessageTypes;

  return (
    <SContainer>
      <SListHeader>
        <SLabel>{label}</SLabel>
      </SListHeader>
      <SItemList>
        <SItem>
          {isRequiredInfoChecked ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>1. 모임 정보</SItemLabel>
        </SItem>

        <SGap />
        <SItem>
          {isOptionalInfoChecked ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>2. 추가 정보</SItemLabel>
        </SItem>
      </SItemList>

      <SButtonContainer>
        <Button
          onClick={() => {
            open(dialogOption);
          }}
          disabled={disabled}
        >
          {submitButtonLabel}
        </Button>
        {cancelButtonLabel && (
          <Button type="button" onClick={() => router.back()}>
            {cancelButtonLabel}
          </Button>
        )}
      </SButtonContainer>
    </SContainer>
  );
}

export default TableOfContents;

const SContainer = styled('div', {
  width: '300px',
  height: 'fit-content',
  padding: '50px 40px 60px',
  border: '1px solid $gray700',
  borderRadius: '15px',
  position: 'sticky',
  top: '$80',

  // '@media (max-width: 768px)': {
  '@media (max-width: 1024px)': {
    display: 'none',
  },
});

const SListHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$36',
  paddingBottom: '$36',
  width: '$190',
  borderBottom: '1px solid $gray700',
});

const SLabel = styled('h2', {
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '100%',
  color: '$gray10',
});

const SItemList = styled('ul', {
  margin: 0,
  flexDirection: 'column',
});

const SGap = styled('div', {
  height: '51px',
  margin: '-1px 7px',
  borderLeft: '1px solid $gray600',
});

const SItem = styled('li', {
  display: 'flex',
  alignItems: 'center',
  gap: '28px',
});

const SItemLabel = styled('span', {
  display: 'inline-block',
  fontAg: '16_medium_100',
  color: '$gray10',
});

const SButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  marginTop: '48px',
});
