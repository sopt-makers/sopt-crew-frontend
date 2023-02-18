import { useFormContext, useWatch } from 'react-hook-form';
import { FormType } from 'src/types/form';
import { styled } from 'stitches.config';
import UncheckedIcon from 'public/assets/svg/icon_progress_unchecked.svg';
import CheckedIcon from 'public/assets/svg/icon_progress_checked.svg';

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
  const isImageValid = form.files?.length > 0;
  const isApplicationDateValid =
    form.startDate && form.endDate && !errors.startDate && !errors.endDate;
  const isMemberCountValid = form.capacity && !errors.capacity;
  const isDetailValid =
    form.detail &&
    form.detail.desc &&
    form.detail.processDesc &&
    form.detail.mStartDate &&
    form.detail.mEndDate &&
    form.detail.leaderDesc &&
    form.detail.targetDesc &&
    !errors.detail;

  return (
    <SContainer>
      <SLabelWrapper>
        <SLabel>{label}</SLabel>
      </SLabelWrapper>

      <SItemList>
        <SItem>
          {isTitleValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모임 제목</SItemLabel>
        </SItem>
        <SItem>
          {isCategoryValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모임 카테고리</SItemLabel>
        </SItem>
        <SItem>
          {isImageValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>이미지</SItemLabel>
        </SItem>
        <SItem>
          {isApplicationDateValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모집 기간</SItemLabel>
        </SItem>
        <SItem>
          {isMemberCountValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모집 인원</SItemLabel>
        </SItem>
        <SItem>
          {isDetailValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모임 정보</SItemLabel>
        </SItem>
      </SItemList>
    </SContainer>
  );
}

export default TableOfContents;

const SContainer = styled('div', {
  padding: '50px 40px 60px',
  width: '278px',
  height: 'fit-content',
  background: '$black80',
  border: '1px solid $black60',
  borderRadius: '15px',
  position: 'sticky',
  top: '$80',

  '@mobile': {
    display: 'none',
  },
});
const SLabelWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '72px',
});
const SLabel = styled('h2', {
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '100%',
  color: '$white',
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
  color: '$white',
});
