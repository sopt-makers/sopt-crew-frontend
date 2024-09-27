import { useFormContext, useWatch } from 'react-hook-form';
import { FormType } from '@type/form';
import { styled } from 'stitches.config';
import UncheckedIcon from '@assets/svg/icon_progress_unchecked.svg';
import CheckedIcon from '@assets/svg/icon_progress_checked.svg';
interface TableOfContentsProps {
  label: string;
}

function TableOfContents({ label }: TableOfContentsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormType>();
  const form = useWatch({ control });
  console.log(form);
  const isTitleValid = form.title && !errors.title;
  const isCategoryValid = form.category?.value && !errors.category;
  const isImageValid = form.files && form.files.length > 0;
  const isDescriptionValid = form.detail && form.detail.desc && form.detail.processDesc && !errors.detail;
  const isApplicationDateValid = form.startDate && form.endDate && !errors.startDate && !errors.endDate;
  const isTargetValid =
    form.detail &&
    form.detail.joinableParts &&
    form.detail.joinableParts.length > 1 &&
    form.detail.targetDesc &&
    form.capacity &&
    !errors.capacity &&
    !errors.detail; // default 옵션이 선택되어 있기 때문 최소 2개 이상 선택되어야 통과
  const isActivationDateValid = form.detail && form.detail.mStartDate && form.detail.mEndDate;
  /*
  const validityList = [
    isTitleValid,
    isCategoryValid,
    isImageValid,
    isApplicationDateValid,
    isMemberCountValid,
    isDescriptionValid,
  ];
  */

  return (
    <SContainer>
      <SListHeader>
        <SLabel>{label}</SLabel>
        {/*
        <SCount>
          {validityList.filter(Boolean).length} / {validityList.length}
        </SCount>
        */}
      </SListHeader>

      <SItemList>
        <SItem>
          {isTitleValid && isCategoryValid && isImageValid && isDescriptionValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>1. 모임 정보</SItemLabel>
        </SItem>
        <SItem>
          {isApplicationDateValid && isTargetValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>2. 모집 정보</SItemLabel>
        </SItem>
        <SItem>
          {isActivationDateValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>3. 활동 정보</SItemLabel>
        </SItem>
      </SItemList>
    </SContainer>
  );
}

export default TableOfContents;

const SContainer = styled('div', {
  width: '341px',
  padding: '50px 40px 60px',
  height: 'fit-content',
  border: '1px solid $gray700',
  borderRadius: '15px',
  position: 'sticky',
  top: '$80',

  '@tablet': {
    display: 'none',
  },
});

const SListHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$36',
  paddingBottom: '$36',
  borderBottom: '1.5px solid $gray700',
});

const SLabel = styled('h2', {
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '100%',
  color: '$gray10',
});

const SItemList = styled('ul', {
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
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
