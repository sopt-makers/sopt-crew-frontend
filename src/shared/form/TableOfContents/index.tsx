import CheckedIcon from '@assets/svg/icon_progress_checked.svg';
import UncheckedIcon from '@assets/svg/icon_progress_unchecked.svg';
import { FormType } from '@type/form';
import { useFormContext, useWatch } from 'react-hook-form';
import { styled } from 'stitches.config';

interface TableOfContentsProps {
  label: string;
}

function TableOfContents({ label }: TableOfContentsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormType>();
  const form = useWatch({ control });
  const isTitleValid = form.title && !errors.title;

  const isCategoryValid = form.category?.value && !errors.category;
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
  const isActivationDateValid =
    form.detail && form.detail.mDateRange && form.detail.mDateRange[0] && form.detail.mDateRange[1];
  const isProcessDesc = form.detail?.processDesc;
  return (
    <SContainer>
      <SListHeader>
        <SLabel>{label}</SLabel>
      </SListHeader>
      <SItemList>
        <SItem>
          {isTitleValid && isCategoryValid && isImageValid && isDescriptionValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>1. 모임 정보</SItemLabel>
        </SItem>
        <SGap />
        <SItem>
          {isActivationDateValid && isProcessDesc ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>2. 활동 정보</SItemLabel>
        </SItem>
        <SGap />
        <SItem>
          {isApplicationDateValid && isTargetValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>3. 모집 정보</SItemLabel>
        </SItem>
        <SGap />
        <SItem>
          {isTitleValid &&
          isCategoryValid &&
          isImageValid &&
          isDescriptionValid &&
          isActivationDateValid &&
          isProcessDesc &&
          isApplicationDateValid &&
          isTargetValid ? (
            <CheckedIcon />
          ) : (
            <UncheckedIcon />
          )}
          <SItemLabel>4. 추가 정보</SItemLabel>
        </SItem>
      </SItemList>
    </SContainer>
  );
}

export default TableOfContents;

const SContainer = styled('div', {
  width: '341px',
  height: 'fit-content',
  padding: '50px 40px 60px',
  border: '1px solid $gray700',
  borderRadius: '15px',
  position: 'sticky',
  top: '$80',

  '@media (max-width: 768px)': {
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
  height: '53px',
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
